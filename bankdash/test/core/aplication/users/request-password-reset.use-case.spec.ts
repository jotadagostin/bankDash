import { RequestPasswordResetUseCase } from "@/core/application/users/request-password-reset.use-case";
import { EmailSender } from "@/core/domain/users/email-sender";
import { PasswordResetTokenRepository } from "@/core/domain/users/password-reset-token.repository";
import { TokenGenerator } from "@/core/domain/users/token-generator";
import { User } from "@/core/domain/users/user.entity";
import { UserRepository } from "@/core/domain/users/user.repository";

const ONE_HOUR_MS = 60 * 60 * 1000;

describe("RequestPasswordResetUseCase", () => {
  const now = new Date("2026-11-05T12:00:00Z");

  const user: User = {
    id: "u1",
    name: "Joao Paulo",
    email: "joao@example.com",
    passwordHash: "hashed-password",
    avatarUrl: null,
    createdAt: new Date("2026-01-01T00:00:00Z"),
  };

  const findByEmail = jest.fn();
  const markAllAsUsedByUserId = jest.fn();
  const createToken = jest.fn();
  const generate = jest.fn();
  const hash = jest.fn();
  const sendPasswordReset = jest.fn();

  const users = {
    findByEmail,
    findById: jest.fn(),
    create: jest.fn(),
    updatePasswordHash: jest.fn(),
  } as UserRepository;
  const tokens = {
    create: createToken,
    findByTokenHash: jest.fn(),
    markAllAsUsedByUserId,
  } as PasswordResetTokenRepository;
  const tokenGenerator = { generate, hash } as TokenGenerator;
  const emailSender = { sendPasswordReset } as EmailSender;

  function makeUseCase(appUrl = "http://localhost:3000") {
    return new RequestPasswordResetUseCase(
      users,
      tokens,
      tokenGenerator,
      emailSender,
      appUrl,
      () => now,
    );
  }

  beforeEach(() => {
    findByEmail.mockReset();
    markAllAsUsedByUserId.mockReset();
    createToken.mockReset();
    generate.mockReset();
    hash.mockReset();
    sendPasswordReset.mockReset();

    generate.mockReturnValue("plain-token");
    hash.mockReturnValue("hashed-token");
  });

  it("should store only the token hash, valid for one hour, and e-mail the link", async () => {
    findByEmail.mockResolvedValue(user);

    await makeUseCase().execute({ email: "joao@example.com" });

    expect(hash).toHaveBeenCalledWith("plain-token");
    expect(createToken).toHaveBeenCalledWith({
      userId: "u1",
      tokenHash: "hashed-token",
      expiresAt: new Date("2026-11-05T13:00:00Z"),
    });
    expect(createToken).not.toHaveBeenCalledWith(
      expect.objectContaining({ tokenHash: "plain-token" }),
    );
    expect(sendPasswordReset).toHaveBeenCalledWith({
      to: "joao@example.com",
      name: "Joao Paulo",
      resetUrl: "http://localhost:3000/reset-password?token=plain-token",
    });
  });

  it("should invalidate previous tokens before creating the new one", async () => {
    findByEmail.mockResolvedValue(user);

    await makeUseCase().execute({ email: "joao@example.com" });

    expect(markAllAsUsedByUserId).toHaveBeenCalledWith("u1", now);
    expect(markAllAsUsedByUserId.mock.invocationCallOrder[0]).toBeLessThan(
      createToken.mock.invocationCallOrder[0],
    );
  });

  it("should trim the e-mail before searching", async () => {
    findByEmail.mockResolvedValue(user);

    await makeUseCase().execute({ email: "  joao@example.com  " });

    expect(findByEmail).toHaveBeenCalledWith("joao@example.com");
  });

  it("should ignore a trailing slash in the app URL", async () => {
    findByEmail.mockResolvedValue(user);

    await makeUseCase("https://bankdash.app/").execute({
      email: "joao@example.com",
    });

    expect(sendPasswordReset).toHaveBeenCalledWith(
      expect.objectContaining({
        resetUrl: "https://bankdash.app/reset-password?token=plain-token",
      }),
    );
  });

  it("should URL-encode the token in the link", async () => {
    findByEmail.mockResolvedValue(user);
    generate.mockReturnValue("a+b/c=");

    await makeUseCase().execute({ email: "joao@example.com" });

    expect(sendPasswordReset).toHaveBeenCalledWith(
      expect.objectContaining({
        resetUrl: "http://localhost:3000/reset-password?token=a%2Bb%2Fc%3D",
      }),
    );
  });

  it("should resolve without creating a token or sending an e-mail when the user does not exist", async () => {
    findByEmail.mockResolvedValue(null);

    await expect(
      makeUseCase().execute({ email: "nobody@example.com" }),
    ).resolves.toBeUndefined();

    expect(markAllAsUsedByUserId).not.toHaveBeenCalled();
    expect(createToken).not.toHaveBeenCalled();
    expect(sendPasswordReset).not.toHaveBeenCalled();
  });

  it.each(["", "   "])(
    "should fail when the e-mail is blank (%p)",
    async (email) => {
      await expect(makeUseCase().execute({ email })).rejects.toThrow(
        "MISSING_EMAIL",
      );

      expect(findByEmail).not.toHaveBeenCalled();
    },
  );

  it("should propagate the error when the e-mail cannot be sent", async () => {
    findByEmail.mockResolvedValue(user);
    sendPasswordReset.mockRejectedValue(new Error("SMTP_DOWN"));

    await expect(
      makeUseCase().execute({ email: "joao@example.com" }),
    ).rejects.toThrow("SMTP_DOWN");
  });

  it("should use the current time when no clock is provided", async () => {
    findByEmail.mockResolvedValue(user);
    const useCase = new RequestPasswordResetUseCase(
      users,
      tokens,
      tokenGenerator,
      emailSender,
      "http://localhost:3000",
    );

    const before = Date.now();
    await useCase.execute({ email: "joao@example.com" });
    const after = Date.now();

    const { expiresAt } = createToken.mock.calls[0][0];

    expect(expiresAt.getTime()).toBeGreaterThanOrEqual(before + ONE_HOUR_MS);
    expect(expiresAt.getTime()).toBeLessThanOrEqual(after + ONE_HOUR_MS);
  });
});

import { ResetPasswordUseCase } from "@/core/application/users/reset-password.use-case";
import { PasswordHasher } from "@/core/domain/users/password-hasher";
import { PasswordResetToken } from "@/core/domain/users/password-reset-token.entity";
import { PasswordResetTokenRepository } from "@/core/domain/users/password-reset-token.repository";
import { TokenGenerator } from "@/core/domain/users/token-generator";
import { UserRepository } from "@/core/domain/users/user.repository";

describe("ResetPasswordUseCase", () => {
  const now = new Date("2026-11-05T12:00:00Z");

  const validToken: PasswordResetToken = {
    id: "t1",
    userId: "u1",
    tokenHash: "hashed-token",
    expiresAt: new Date("2026-11-05T12:30:00Z"),
    usedAt: null,
    createdAt: new Date("2026-11-05T11:30:00Z"),
  };

  const findByTokenHash = jest.fn();
  const markAllAsUsedByUserId = jest.fn();
  const updatePasswordHash = jest.fn();
  const generate = jest.fn();
  const hashToken = jest.fn();
  const hashPassword = jest.fn();

  const users = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updatePasswordHash,
  } as UserRepository;
  const tokens = {
    create: jest.fn(),
    findByTokenHash,
    markAllAsUsedByUserId,
  } as PasswordResetTokenRepository;
  const tokenGenerator = { generate, hash: hashToken } as TokenGenerator;
  const hasher = {
    hash: hashPassword,
    compare: jest.fn(),
  } as PasswordHasher;

  let useCase: ResetPasswordUseCase;

  beforeEach(() => {
    findByTokenHash.mockReset();
    markAllAsUsedByUserId.mockReset();
    updatePasswordHash.mockReset();
    generate.mockReset();
    hashToken.mockReset();
    hashPassword.mockReset();

    hashToken.mockReturnValue("hashed-token");
    hashPassword.mockResolvedValue("new-password-hash");

    useCase = new ResetPasswordUseCase(
      users,
      tokens,
      tokenGenerator,
      hasher,
      () => now,
    );
  });

  it("should consume the tokens and save the new password hash", async () => {
    findByTokenHash.mockResolvedValue(validToken);

    await useCase.execute({ token: "plain-token", password: "new-password" });

    expect(hashToken).toHaveBeenCalledWith("plain-token");
    expect(findByTokenHash).toHaveBeenCalledWith("hashed-token");
    expect(hashPassword).toHaveBeenCalledWith("new-password");
    expect(markAllAsUsedByUserId).toHaveBeenCalledWith("u1", now);
    expect(updatePasswordHash).toHaveBeenCalledWith("u1", "new-password-hash");
  });

  it("should consume the tokens before saving the new password", async () => {
    findByTokenHash.mockResolvedValue(validToken);

    await useCase.execute({ token: "plain-token", password: "new-password" });

    expect(markAllAsUsedByUserId.mock.invocationCallOrder[0]).toBeLessThan(
      updatePasswordHash.mock.invocationCallOrder[0],
    );
  });

  it("should not trim the password", async () => {
    findByTokenHash.mockResolvedValue(validToken);

    await useCase.execute({ token: "plain-token", password: "  pass word  " });

    expect(hashPassword).toHaveBeenCalledWith("  pass word  ");
  });

  it("should accept a password with exactly 8 characters", async () => {
    findByTokenHash.mockResolvedValue(validToken);

    await expect(
      useCase.execute({ token: "plain-token", password: "12345678" }),
    ).resolves.toBeUndefined();
  });

  it("should fail when the token is empty", async () => {
    await expect(
      useCase.execute({ token: "", password: "new-password" }),
    ).rejects.toThrow("INVALID_TOKEN");

    expect(findByTokenHash).not.toHaveBeenCalled();
    expect(updatePasswordHash).not.toHaveBeenCalled();
  });

  it("should fail when the password has fewer than 8 characters", async () => {
    await expect(
      useCase.execute({ token: "plain-token", password: "1234567" }),
    ).rejects.toThrow("PASSWORD_TOO_SHORT");

    expect(findByTokenHash).not.toHaveBeenCalled();
    expect(updatePasswordHash).not.toHaveBeenCalled();
  });

  it("should fail when the token does not exist", async () => {
    findByTokenHash.mockResolvedValue(null);

    await expect(
      useCase.execute({ token: "unknown", password: "new-password" }),
    ).rejects.toThrow("INVALID_TOKEN");

    expect(markAllAsUsedByUserId).not.toHaveBeenCalled();
    expect(updatePasswordHash).not.toHaveBeenCalled();
  });

  it("should fail when the token was already used", async () => {
    findByTokenHash.mockResolvedValue({
      ...validToken,
      usedAt: new Date("2026-11-05T11:45:00Z"),
    });

    await expect(
      useCase.execute({ token: "plain-token", password: "new-password" }),
    ).rejects.toThrow("INVALID_TOKEN");

    expect(markAllAsUsedByUserId).not.toHaveBeenCalled();
    expect(updatePasswordHash).not.toHaveBeenCalled();
  });

  it("should fail when the token has expired", async () => {
    findByTokenHash.mockResolvedValue({
      ...validToken,
      expiresAt: new Date("2026-11-05T11:59:59Z"),
    });

    await expect(
      useCase.execute({ token: "plain-token", password: "new-password" }),
    ).rejects.toThrow("EXPIRED_TOKEN");

    expect(markAllAsUsedByUserId).not.toHaveBeenCalled();
    expect(updatePasswordHash).not.toHaveBeenCalled();
  });

  it("should treat a token that expires exactly now as expired", async () => {
    findByTokenHash.mockResolvedValue({ ...validToken, expiresAt: now });

    await expect(
      useCase.execute({ token: "plain-token", password: "new-password" }),
    ).rejects.toThrow("EXPIRED_TOKEN");
  });

  it("should keep the token valid when hashing the password fails", async () => {
    findByTokenHash.mockResolvedValue(validToken);
    hashPassword.mockRejectedValue(new Error("HASH_FAILED"));

    await expect(
      useCase.execute({ token: "plain-token", password: "new-password" }),
    ).rejects.toThrow("HASH_FAILED");

    expect(markAllAsUsedByUserId).not.toHaveBeenCalled();
    expect(updatePasswordHash).not.toHaveBeenCalled();
  });

  it("should use the current time when no clock is provided", async () => {
    const realClockUseCase = new ResetPasswordUseCase(
      users,
      tokens,
      tokenGenerator,
      hasher,
    );
    findByTokenHash.mockResolvedValue({
      ...validToken,
      expiresAt: new Date(Date.now() + 60_000),
    });

    await expect(
      realClockUseCase.execute({
        token: "plain-token",
        password: "new-password",
      }),
    ).resolves.toBeUndefined();

    expect(markAllAsUsedByUserId).toHaveBeenCalledWith("u1", expect.any(Date));
  });

  it("should reject an expired token when no clock is provided", async () => {
    const realClockUseCase = new ResetPasswordUseCase(
      users,
      tokens,
      tokenGenerator,
      hasher,
    );
    findByTokenHash.mockResolvedValue({
      ...validToken,
      expiresAt: new Date(Date.now() - 60_000),
    });

    await expect(
      realClockUseCase.execute({
        token: "plain-token",
        password: "new-password",
      }),
    ).rejects.toThrow("EXPIRED_TOKEN");
  });
});

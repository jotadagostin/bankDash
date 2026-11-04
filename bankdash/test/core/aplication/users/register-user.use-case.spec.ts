import { RegisterUserUseCase } from "@/core/application/users/register-user.use-case";
import { PasswordHasher } from "@/core/domain/users/password-hasher";
import { User } from "@/core/domain/users/user.entity";
import { UserRepository } from "@/core/domain/users/user.repository";

describe("RegisterUserUseCase", () => {
  const createdUser: User = {
    id: "u1",
    name: "Joao Paulo",
    email: "joao@example.com",
    passwordHash: "hashed-password",
    avatarUrl: null,
    createdAt: new Date(),
  };

  const findByEmail = jest.fn();
  const create = jest.fn();
  const hash = jest.fn();

  const users = { findByEmail, findById: jest.fn(), create } as UserRepository;
  const hasher = { hash, compare: jest.fn() } as PasswordHasher;

  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    findByEmail.mockReset();
    create.mockReset();
    hash.mockReset();
    useCase = new RegisterUserUseCase(users, hasher);
  });

  it("should hash the password, create the user and return it without the hash", async () => {
    findByEmail.mockResolvedValue(null);
    hash.mockResolvedValue("hashed-password");
    create.mockResolvedValue(createdUser);

    const result = await useCase.execute({
      name: "Joao Paulo",
      email: "joao@example.com",
      password: "password123",
    });

    expect(hash).toHaveBeenCalledWith("password123");
    expect(create).toHaveBeenCalledWith({
      name: "Joao Paulo",
      email: "joao@example.com",
      passwordHash: "hashed-password",
    });
    expect(result).toEqual({
      id: "u1",
      name: "Joao Paulo",
      email: "joao@example.com",
      avatarUrl: null,
    });
    expect(result).not.toHaveProperty("passwordHash");
  });

  it("should trim the name and the e-mail", async () => {
    findByEmail.mockResolvedValue(null);
    hash.mockResolvedValue("hashed-password");
    create.mockResolvedValue(createdUser);

    await useCase.execute({
      name: "  Joao Paulo  ",
      email: "  joao@example.com  ",
      password: "password123",
    });

    expect(findByEmail).toHaveBeenCalledWith("joao@example.com");
    expect(create).toHaveBeenCalledWith({
      name: "Joao Paulo",
      email: "joao@example.com",
      passwordHash: "hashed-password",
    });
  });

  it("should not trim the password", async () => {
    findByEmail.mockResolvedValue(null);
    hash.mockResolvedValue("hashed-password");
    create.mockResolvedValue(createdUser);

    await useCase.execute({
      name: "Joao Paulo",
      email: "joao@example.com",
      password: "  pass word  ",
    });

    expect(hash).toHaveBeenCalledWith("  pass word  ");
  });

  it.each([
    ["name", { name: "", email: "joao@example.com", password: "password123" }],
    [
      "name (only spaces)",
      { name: "   ", email: "joao@example.com", password: "password123" },
    ],
    ["email", { name: "Joao Paulo", email: "", password: "password123" }],
    [
      "email (only spaces)",
      { name: "Joao Paulo", email: "   ", password: "password123" },
    ],
    [
      "password",
      { name: "Joao Paulo", email: "joao@example.com", password: "" },
    ],
  ])("should fail when the %s is missing", async (_label, input) => {
    await expect(useCase.execute(input)).rejects.toThrow("MISSING_FIELDS");

    expect(findByEmail).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
  });

  it("should fail when the password has fewer than 8 characters", async () => {
    await expect(
      useCase.execute({
        name: "Joao Paulo",
        email: "joao@example.com",
        password: "1234567",
      }),
    ).rejects.toThrow("PASSWORD_TOO_SHORT");

    expect(findByEmail).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
  });

  it("should accept a password with exactly 8 characters", async () => {
    findByEmail.mockResolvedValue(null);
    hash.mockResolvedValue("hashed-password");
    create.mockResolvedValue(createdUser);

    await expect(
      useCase.execute({
        name: "Joao Paulo",
        email: "joao@example.com",
        password: "12345678",
      }),
    ).resolves.toBeDefined();
  });

  it("should fail when the e-mail is already registered", async () => {
    findByEmail.mockResolvedValue(createdUser);

    await expect(
      useCase.execute({
        name: "Joao Paulo",
        email: "joao@example.com",
        password: "password123",
      }),
    ).rejects.toThrow("EMAIL_ALREADY_EXISTS");

    expect(hash).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
  });
});

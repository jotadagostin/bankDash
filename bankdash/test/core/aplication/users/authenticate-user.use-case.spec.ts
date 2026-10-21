import { AuthenticateUserUseCase } from "@/core/application/users/authenticate-user.use-case";
import { PasswordHasher } from "@/core/domain/users/password-hasher";
import { User } from "@/core/domain/users/user.entity";
import { UserRepository } from "@/core/domain/users/user.repository";

describe("AuthenticateUserUseCase", () => {
  const user: User = {
    id: "u1",
    name: "Joao Paulo",
    email: "joao@example.com",
    passwordHash: "hashed-password",
    avatarUrl: null,
    createdAt: new Date(),
  };

  const findByEmail = jest.fn();
  const compare = jest.fn();

  const users = { findByEmail, findById: jest.fn() } as UserRepository;
  const hasher = { compare } as PasswordHasher;

  let useCase: AuthenticateUserUseCase;

  beforeEach(() => {
    findByEmail.mockReset();
    compare.mockReset();
    useCase = new AuthenticateUserUseCase(users, hasher);
  });

  it("The user must be returned without a hash when the credentials are valid.", async () => {
    findByEmail.mockResolvedValue(user);
    compare.mockResolvedValue(true);

    const result = await useCase.execute({
      email: "joao@example.com",
      password: "123456",
    });

    expect(compare).toHaveBeenCalledWith("123456", "hashed-password");
    expect(result).toEqual({
      id: "u1",
      name: "Joao Paulo",
      email: "joao@example.com",
      avatarUrl: null,
    });
    expect(result).not.toHaveProperty("passwordHash");
  });

  it("You should save e-mail spaces before searching.", async () => {
    findByEmail.mockResolvedValue(user);
    compare.mockResolvedValue(true);

    await useCase.execute({
      email: "  joao@example.com  ",
      password: "123456",
    });

    expect(findByEmail).toHaveBeenCalledWith("joao@example.com");
  });

  it("must fail when the user does not exist", async () => {
    findByEmail.mockResolvedValue(user);

    await expect(
      useCase.execute({ email: "x@example.com", password: "123456" }),
    ).rejects.toThrow("INVALID_CREDENTIALS");
  });

  expect(compare).not.toHaveBeenCalled();

  it("must be fail when the password is wrong", async () => {
    findByEmail.mockResolvedValue(user);
    compare.mockResolvedValue(false);

    await expect(
      useCase.execute({ email: "joao@example.com", password: "wrong" }),
    ).rejects.toThrow("INVALID_CREDENTIALS");
  });
});

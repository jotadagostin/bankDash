import { PasswordHasher } from "@/core/domain/users/password-hasher";
import { UserRepository } from "@/core/domain/users/user.repository";

const MIN_PASSWORD_LENGTH = 8;

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisteredUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
};

export class RegisterUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserInput): Promise<RegisteredUser> {
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password) {
      throw new Error("MISSING_FIELDS");
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new Error("PASSWORD_TOO_SHORT");
    }

    const existing = await this.users.findByEmail(cleanEmail);

    if (existing) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    // A senha não é "aparada": espaços fazem parte dela.
    const passwordHash = await this.hasher.hash(password);

    const user = await this.users.create({
      name: cleanName,
      email: cleanEmail,
      passwordHash,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    };
  }
}

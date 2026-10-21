import { PasswordHasher } from "@/core/domain/users/password-hasher";
import { UserRepository } from "@/core/domain/users/user.repository";

export type AuthenticateUserInput = {
  email: string;
  password: string;
};

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
};

export class AuthenticateUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserInput): Promise<AuthenticatedUser> {
    const user = await this.users.findByEmail(email.trim());

    // Mesmo erro para "usuário não existe" e "senha errada",
    // para não revelar quais e-mails estão cadastrados.
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const passwordMatches = await this.hasher.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    };
  }
}

import { PasswordHasher } from "@/core/domain/users/password-hasher";
import { PasswordResetTokenRepository } from "@/core/domain/users/password-reset-token.repository";
import { TokenGenerator } from "@/core/domain/users/token-generator";
import { UserRepository } from "@/core/domain/users/user.repository";

const MIN_PASSWORD_LENGTH = 8;

export type ResetPasswordInput = {
  token: string;
  password: string;
};

export class ResetPasswordUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly tokens: PasswordResetTokenRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly hasher: PasswordHasher,
    private readonly now: () => Date = () => new Date(),
  ) {}

  async execute({ token, password }: ResetPasswordInput): Promise<void> {
    if (!token) {
      throw new Error("INVALID_TOKEN");
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new Error("PASSWORD_TOO_SHORT");
    }

    const record = await this.tokens.findByTokenHash(
      this.tokenGenerator.hash(token),
    );
    const now = this.now();

    // Token desconhecido e token já usado dão o mesmo erro.
    if (!record || record.usedAt !== null) {
      throw new Error("INVALID_TOKEN");
    }

    if (record.expiresAt.getTime() <= now.getTime()) {
      throw new Error("EXPIRED_TOKEN");
    }

    // O hash é calculado antes de consumir o token: se falhar, o link
    // continua válido. Depois de consumido, uma falha ao gravar a senha
    // obriga a pedir um link novo, o que é o lado seguro.
    const passwordHash = await this.hasher.hash(password);

    await this.tokens.markAllAsUsedByUserId(record.userId, now);
    await this.users.updatePasswordHash(record.userId, passwordHash);
  }
}

import { PasswordResetToken } from "./password-reset-token.entity";

export type CreatePasswordTokenData = {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
};

export interface PasswordResetTokenRepository {
  create(data: CreatePasswordTokenData): Promise<void>;
  findByTokenHash(tokenHash: string): Promise<PasswordResetToken | null>;
  /** Marca como usados todos os tokens ainda não usados do usuário. */
  markAllAsUsedByUserId(userId: string, usedAt: Date): Promise<void>;
}

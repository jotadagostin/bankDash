import { EmailSender } from "@/core/domain/users/email-sender";
import { PasswordResetTokenRepository } from "@/core/domain/users/password-reset-token.repository";
import { TokenGenerator } from "@/core/domain/users/token-generator";
import { UserRepository } from "@/core/domain/users/user.repository";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hora

export type RequestPasswordResetInput = {
  email: string;
};

export class RequestPasswordResetUseCase {
  private readonly appUrl: string;

  constructor(
    private readonly users: UserRepository,
    private readonly tokens: PasswordResetTokenRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly emailSender: EmailSender,
    appUrl: string,
    private readonly now: () => Date = () => new Date(),
  ) {
    this.appUrl = appUrl.replace(/\/+$/, "");
  }

  async execute({ email }: RequestPasswordResetInput): Promise<void> {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      throw new Error("MISSING_EMAIL");
    }

    const user = await this.users.findByEmail(cleanEmail);

    // Sem erro quando o e-mail não existe: a resposta é a mesma nos dois
    // casos, para a tela não revelar quais e-mails têm conta.
    if (!user) {
      return;
    }

    const now = this.now();

    // Links pedidos antes deixam de valer.
    await this.tokens.markAllAsUsedByUserId(user.id, now);

    const token = this.tokenGenerator.generate();

    await this.tokens.create({
      userId: user.id,
      tokenHash: this.tokenGenerator.hash(token),
      expiresAt: new Date(now.getTime() + TOKEN_TTL_MS),
    });

    await this.emailSender.sendPasswordReset({
      to: user.email,
      name: user.name,
      resetUrl: `${this.appUrl}/reset-password?token=${encodeURIComponent(token)}`,
    });
  }
}

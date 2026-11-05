export type PasswordResetEmail = {
  to: string;
  name: string;
  resetUrl: string;
};

export interface EmailSender {
  sendPasswordReset(email: PasswordResetEmail): Promise<void>;
}

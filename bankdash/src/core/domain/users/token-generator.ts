export interface TokenGenerator {
  /** Gera um token aleatório em texto puro (o que vai no link do e-mail). */
  generate(): string;
  /** Hash determinístico do token (o que fica guardado no banco). */
  hash(token: string): string;
}

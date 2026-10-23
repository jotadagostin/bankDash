import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { AuthenticateUserUseCase } from "@/core/application/users/authenticate-user.use-case";
import { DrizzleUserRepository } from "@/infra/repository/drizzle-user.repository";
import { BcryptPasswordHasher } from "@/infra/security/bcrypt-password-hasher";

const authenticateUser = new AuthenticateUserUseCase(
  new DrizzleUserRepository(db),
  new BcryptPasswordHasher(),
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        try {
          const user = await authenticateUser.execute({ email, password });

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.avatarUrl,
          };
        } catch (error) {
          if (
            error instanceof Error &&
            error.message === "INVALID_CREDENTIALS"
          ) {
            return null;
          }
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

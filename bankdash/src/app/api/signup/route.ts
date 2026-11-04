import { NextResponse } from "next/server";

import { RegisterUserUseCase } from "@/core/application/users/register-user.use-case";
import { DrizzleUserRepository } from "@/infra/repository/drizzle-user.repository";
import { BcryptPasswordHasher } from "@/infra/security/bcrypt-password-hasher";
import { db } from "@/lib/db";

const registerUser = new RegisterUserUseCase(
  new DrizzleUserRepository(db),
  new BcryptPasswordHasher(),
);

const knownErrors: Record<string, { message: string; status: number }> = {
  MISSING_FIELDS: { message: "Missing fields.", status: 400 },
  PASSWORD_TOO_SHORT: {
    message: "Password must be at least 8 characters.",
    status: 400,
  },
  EMAIL_ALREADY_EXISTS: {
    message: "An account with this email already exists.",
    status: 409,
  },
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  try {
    await registerUser.execute({
      name: asString(body?.name),
      email: asString(body?.email),
      password: asString(body?.password),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const known =
      error instanceof Error ? knownErrors[error.message] : undefined;

    if (known) {
      return NextResponse.json(
        { error: known.message },
        { status: known.status },
      );
    }

    console.error("Failed to register user", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}

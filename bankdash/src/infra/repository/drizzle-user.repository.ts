import { eq } from "drizzle-orm";

import { User } from "@/core/domain/users/user.entity";
import {
  CreateUserData,
  UserRepository,
} from "@/core/domain/users/user.repository";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

type Database = typeof db;

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly database: Database) {}

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.database
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await this.database
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user ?? null;
  }

  async create(data: CreateUserData): Promise<User> {
    const [user] = await this.database
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
      })
      .returning();

    return user;
  }
}

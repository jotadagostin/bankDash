import { User } from "./user.entity";

export type CreateUserData = {
  name: string;
  email: string;
  passwordHash: string;
};

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
}

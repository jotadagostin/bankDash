import { PasswordHasher } from "@/core/domain/users/password-hasher";
import bcrypt from "bcryptjs";

export class BcryptPasswordHasher implements PasswordHasher {
  compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}

import { BcryptPasswordHasher } from "@/infra/security/bcrypt-password-hasher";
import bcrypt from "bcryptjs";

describe("BcryptPasswordHasher", () => {
  const hasher = new BcryptPasswordHasher();

  it("must return true when the password corresponds to hash", async () => {
    const hash = await bcrypt.hash("123456", 4);

    await expect(hasher.compare("123456", hash)).resolves.toBe(true);
  });

  it("must return false when the password do not corresponds to hash", async () => {
    const hash = await bcrypt.hash("123456", 4);

    await expect(hasher.compare("wrong", hash)).resolves.toBe(false);
  });
});

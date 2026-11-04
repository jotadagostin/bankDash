/**
 * @jest-environment node
 */
import bcrypt from "bcryptjs";

import { BcryptPasswordHasher } from "@/infra/security/bcrypt-password-hasher";

describe("BcryptPasswordHasher", () => {
  describe("compare", () => {
    const hasher = new BcryptPasswordHasher();

    it("should return true when the password matches the hash", async () => {
      const hash = await bcrypt.hash("123456", 4);

      await expect(hasher.compare("123456", hash)).resolves.toBe(true);
    });

    it("should return false when the password does not match the hash", async () => {
      const hash = await bcrypt.hash("123456", 4);

      await expect(hasher.compare("wrong", hash)).resolves.toBe(false);
    });
  });

  describe("hash", () => {
    it("should return a hash that is different from the password and matches it", async () => {
      const hasher = new BcryptPasswordHasher(4);

      const hash = await hasher.hash("123456");

      expect(hash).not.toBe("123456");
      await expect(bcrypt.compare("123456", hash)).resolves.toBe(true);
    });

    it("should generate different hashes for the same password", async () => {
      const hasher = new BcryptPasswordHasher(4);

      const first = await hasher.hash("123456");
      const second = await hasher.hash("123456");

      expect(first).not.toBe(second);
    });

    it("should use 10 rounds by default", async () => {
      const hasher = new BcryptPasswordHasher();

      const hash = await hasher.hash("123456");

      expect(bcrypt.getRounds(hash)).toBe(10);
    });
  });
});

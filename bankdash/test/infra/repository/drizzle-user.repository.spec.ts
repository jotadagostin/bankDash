import { DrizzleUserRepository } from "@/infra/repository/drizzle-user.repository";
import { users } from "@/lib/db/schema";

jest.mock("@/lib/db", () => ({ db: {} }));

type Database = ConstructorParameters<typeof DrizzleUserRepository>[0];

describe("DrizzleUserRepository", () => {
  const limit = jest.fn();
  const where = jest.fn(() => ({ limit }));
  const from = jest.fn(() => ({ where }));
  const select = jest.fn(() => ({ from }));

  const database = { select } as unknown as Database;
  const repository = new DrizzleUserRepository(database);

  const row = {
    id: "u1",
    name: "Joao Paulo",
    email: "joao@example.com",
    passwordHash: "hashed-password",
    avatarUrl: null,
    createdAt: new Date(),
  };

  beforeEach(() => {
    limit.mockReset();
    where.mockClear();
    from.mockClear();
    select.mockClear();
  });

  describe("findByEmail", () => {
    it("must return the user when exist", async () => {
      limit.mockResolvedValue([row]);

      const result = await repository.findByEmail("joao@example.com");

      expect(select).toHaveBeenCalledTimes(1);
      expect(from).toHaveBeenCalledWith(users);
      expect(where).toHaveBeenCalledTimes(1);
      expect(result).toEqual(row);
    });

    it("must return null when does not existe", async () => {
      limit.mockResolvedValue([]);

      const result = await repository.findByEmail("x@example.com");

      expect(result).toBeNull();
    });
  });

  describe("findById", () => {
    it("Must return the user when exist", async () => {
      limit.mockResolvedValue([row]);

      const result = await repository.findById("u1");

      expect(from).toHaveBeenCalledWith(users);
      expect(limit).toHaveBeenLastCalledWith(1);
      expect(result).toEqual(row);
    });

    it("must return null when does not exist", async () => {
      limit.mockResolvedValue([]);

      const result = await repository.findById("nope");

      expect(result).toBeNull();
    });
  });
});

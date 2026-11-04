/**
 * @jest-environment node
 */
import { users } from "@/lib/db/schema";
import { DrizzleUserRepository } from "@/infra/repository/drizzle-user.repository";

// Evita abrir a conexão real com o Neon ao importar o repository.
jest.mock("@/lib/db", () => ({ db: {} }));

type Database = ConstructorParameters<typeof DrizzleUserRepository>[0];

describe("DrizzleUserRepository", () => {
  // select().from().where().limit()
  const limit = jest.fn();
  const where = jest.fn(() => ({ limit }));
  const from = jest.fn(() => ({ where }));
  const select = jest.fn(() => ({ from }));

  // insert().values().returning()
  const returning = jest.fn();
  const values = jest.fn(() => ({ returning }));
  const insert = jest.fn(() => ({ values }));

  const database = { select, insert } as unknown as Database;
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
    returning.mockReset();
    where.mockClear();
    from.mockClear();
    select.mockClear();
    values.mockClear();
    insert.mockClear();
  });

  describe("findByEmail", () => {
    it("should return the user when it exists", async () => {
      limit.mockResolvedValue([row]);

      const result = await repository.findByEmail("joao@example.com");

      expect(select).toHaveBeenCalledTimes(1);
      expect(from).toHaveBeenCalledWith(users);
      expect(where).toHaveBeenCalledTimes(1);
      expect(limit).toHaveBeenCalledWith(1);
      expect(result).toEqual(row);
    });

    it("should return null when it does not exist", async () => {
      limit.mockResolvedValue([]);

      const result = await repository.findByEmail("x@example.com");

      expect(result).toBeNull();
    });
  });

  describe("findById", () => {
    it("should return the user when it exists", async () => {
      limit.mockResolvedValue([row]);

      const result = await repository.findById("u1");

      expect(from).toHaveBeenCalledWith(users);
      expect(limit).toHaveBeenCalledWith(1);
      expect(result).toEqual(row);
    });

    it("should return null when it does not exist", async () => {
      limit.mockResolvedValue([]);

      const result = await repository.findById("nope");

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("should insert the user and return the created row", async () => {
      returning.mockResolvedValue([row]);

      const result = await repository.create({
        name: "Joao Paulo",
        email: "joao@example.com",
        passwordHash: "hashed-password",
      });

      expect(insert).toHaveBeenCalledWith(users);
      expect(values).toHaveBeenCalledWith({
        name: "Joao Paulo",
        email: "joao@example.com",
        passwordHash: "hashed-password",
      });
      expect(returning).toHaveBeenCalledTimes(1);
      expect(result).toEqual(row);
    });
  });
});

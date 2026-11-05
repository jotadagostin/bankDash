/**
 * @jest-environment node
 */
import { POST } from "@/app/api/signup/route";

// Evita abrir a conexão real com o Neon ao importar a rota.
jest.mock("@/lib/db", () => ({ db: {} }));

const mockExecute = jest.fn();

// A rota cria o use case no momento do import, antes de "mockExecute" existir.
// Por isso o mock só lê "mockExecute" quando "execute" é chamado.
jest.mock("@/core/application/users/register-user.use-case", () => ({
  RegisterUserUseCase: jest.fn().mockImplementation(() => ({
    execute: (...args: unknown[]) => mockExecute(...args),
  })),
}));

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/signup", () => {
  beforeEach(() => {
    mockExecute.mockReset();
  });

  it("should create the account and respond with 201", async () => {
    mockExecute.mockResolvedValue({});

    const response = await POST(
      makeRequest({
        name: "Joao Paulo",
        email: "joao@example.com",
        password: "password123",
      }),
    );

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ success: true });
    expect(mockExecute).toHaveBeenCalledWith({
      name: "Joao Paulo",
      email: "joao@example.com",
      password: "password123",
    });
  });

  it("should respond with 400 when fields are missing", async () => {
    mockExecute.mockRejectedValue(new Error("MISSING_FIELDS"));

    const response = await POST(makeRequest({ name: "Joao Paulo" }));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Missing fields." });
    expect(mockExecute).toHaveBeenCalledWith({
      name: "Joao Paulo",
      email: "",
      password: "",
    });
  });

  it("should respond with 400 when the password is too short", async () => {
    mockExecute.mockRejectedValue(new Error("PASSWORD_TOO_SHORT"));

    const response = await POST(
      makeRequest({
        name: "Joao Paulo",
        email: "joao@example.com",
        password: "123",
      }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Password must be at least 8 characters.",
    });
  });

  it("should respond with 409 when the e-mail is already registered", async () => {
    mockExecute.mockRejectedValue(new Error("EMAIL_ALREADY_EXISTS"));

    const response = await POST(
      makeRequest({
        name: "Joao Paulo",
        email: "joao@example.com",
        password: "password123",
      }),
    );

    expect(response.status).toBe(409);
    expect(await response.json()).toEqual({
      error: "An account with this email already exists.",
    });
  });

  it("should treat a body that is not valid JSON as missing fields", async () => {
    mockExecute.mockRejectedValue(new Error("MISSING_FIELDS"));

    const response = await POST(makeRequest("not-json"));

    expect(response.status).toBe(400);
    expect(mockExecute).toHaveBeenCalledWith({
      name: "",
      email: "",
      password: "",
    });
  });

  it("should treat non-string fields as empty", async () => {
    mockExecute.mockRejectedValue(new Error("MISSING_FIELDS"));

    await POST(makeRequest({ name: 123, email: null, password: { a: 1 } }));

    expect(mockExecute).toHaveBeenCalledWith({
      name: "",
      email: "",
      password: "",
    });
  });

  it("should respond with 500 and a generic message on unexpected errors", async () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockExecute.mockRejectedValue(new Error("DATABASE_DOWN"));

    const response = await POST(
      makeRequest({
        name: "Joao Paulo",
        email: "joao@example.com",
        password: "password123",
      }),
    );

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: "Something went wrong." });
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it("should respond with 500 when a non-Error value is thrown", async () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockExecute.mockRejectedValue("boom");

    const response = await POST(
      makeRequest({
        name: "Joao Paulo",
        email: "joao@example.com",
        password: "password123",
      }),
    );

    expect(response.status).toBe(500);

    consoleError.mockRestore();
  });
});

import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";

import { SignUpForm } from "@/components/auth/SignUpForm";

const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

const mockedSignIn = jest.mocked(signIn);
const fetchMock = jest.fn();

function jsonResponse(ok: boolean, body: unknown) {
  return { ok, json: async () => body } as Response;
}

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Full name"), "Joao Paulo");
  await user.type(screen.getByLabelText("Email"), "joao@example.com");
  await user.type(screen.getByLabelText("Password"), "password123");
  await user.click(screen.getByRole("button", { name: "Create account" }));
}

describe("SignUpForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  it("should render the fields, the submit button and the sign in link", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create account" }),
    ).toBeEnabled();
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("should require a password with at least 8 characters", () => {
    render(<SignUpForm />);

    const password = screen.getByLabelText("Password");

    expect(password).toBeRequired();
    expect(password).toHaveAttribute("minlength", "8");
  });

  it("should toggle the password visibility", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("should create the account, sign in and redirect to the dashboard", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(jsonResponse(true, {}));
    mockedSignIn.mockResolvedValue({ error: undefined, ok: true } as never);
    render(<SignUpForm />);

    await fillAndSubmit(user);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
    expect(fetchMock).toHaveBeenCalledWith("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Joao Paulo",
        email: "joao@example.com",
        password: "password123",
      }),
    });
    expect(mockedSignIn).toHaveBeenCalledWith("credentials", {
      email: "joao@example.com",
      password: "password123",
      redirect: false,
    });
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it("should show the API error and not sign in when the account cannot be created", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(
      jsonResponse(false, { error: "Email already in use." }),
    );
    render(<SignUpForm />);

    await fillAndSubmit(user);

    expect(
      await screen.findByText("Email already in use."),
    ).toBeInTheDocument();
    expect(mockedSignIn).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: "Create account" }),
    ).toBeEnabled();
  });

  it("should show a generic error when the response is not valid JSON", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({
      ok: false,
      json: () => Promise.reject(new Error("invalid json")),
    } as unknown as Response);
    render(<SignUpForm />);

    await fillAndSubmit(user);

    expect(
      await screen.findByText("Something went wrong."),
    ).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should ask the user to sign in manually when the automatic sign-in fails", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(jsonResponse(true, {}));
    mockedSignIn.mockResolvedValue({
      error: "CredentialsSignin",
      ok: false,
    } as never);
    render(<SignUpForm />);

    await fillAndSubmit(user);

    expect(
      await screen.findByText(
        "Account created, but automatic sign-in failed. Please sign in manually.",
      ),
    ).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("should show an error and re-enable the button when the request fails", async () => {
    const user = userEvent.setup();
    fetchMock.mockRejectedValue(new Error("network error"));
    render(<SignUpForm />);

    await fillAndSubmit(user);

    expect(
      await screen.findByText("Something went wrong. Please try again."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create account" }),
    ).toBeEnabled();
    expect(mockedSignIn).not.toHaveBeenCalled();
  });

  it("should disable the button and show the loading text while creating the account", async () => {
    const user = userEvent.setup();
    let resolveFetch!: (value: Response) => void;
    fetchMock.mockReturnValue(
      new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      }),
    );
    render(<SignUpForm />);

    await fillAndSubmit(user);

    expect(
      screen.getByRole("button", { name: "Creating account..." }),
    ).toBeDisabled();

    await act(async () => {
      resolveFetch(jsonResponse(false, { error: "Email already in use." }));
    });

    expect(
      await screen.findByText("Email already in use."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create account" }),
    ).toBeEnabled();
  });

  it("should clear the previous error when submitting again", async () => {
    const user = userEvent.setup();
    fetchMock
      .mockResolvedValueOnce(
        jsonResponse(false, { error: "Email already in use." }),
      )
      .mockResolvedValueOnce(jsonResponse(true, {}));
    mockedSignIn.mockResolvedValue({ error: undefined, ok: true } as never);
    render(<SignUpForm />);

    await fillAndSubmit(user);
    expect(
      await screen.findByText("Email already in use."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
    expect(screen.queryByText("Email already in use.")).not.toBeInTheDocument();
  });
});

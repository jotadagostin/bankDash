import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";

import { LoginForm } from "@/components/auth/LoginForm";

const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

const mockedSignIn = jest.mocked(signIn);

async function fillAndSubmit(
  user: ReturnType<typeof userEvent.setup>,
  email = "joao@example.com",
  password = "123456",
) {
  await user.type(screen.getByLabelText("Email"), email);
  await user.type(screen.getByLabelText("Password"), password);
  await user.click(screen.getByRole("button", { name: "Sign in" }));
}

describe("LoginForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render the fields, the submit button and the links", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeEnabled();
    expect(
      screen.getByRole("link", { name: "Forgot password?" }),
    ).toHaveAttribute("href", "/forgot-password");
    expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute(
      "href",
      "/signup",
    );
  });

  it("should toggle the password visibility", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("should toggle the remember me checkbox", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const checkbox = screen.getByLabelText("Remember me");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("should sign in and redirect to the dashboard when the credentials are valid", async () => {
    const user = userEvent.setup();
    mockedSignIn.mockResolvedValue({ error: undefined, ok: true } as never);
    render(<LoginForm />);

    await fillAndSubmit(user);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
    expect(mockedSignIn).toHaveBeenCalledWith("credentials", {
      email: "joao@example.com",
      password: "123456",
      redirect: false,
    });
    expect(mockRefresh).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText("Invalid email or password."),
    ).not.toBeInTheDocument();
  });

  it("should show an error and not redirect when the credentials are invalid", async () => {
    const user = userEvent.setup();
    mockedSignIn.mockResolvedValue({
      error: "CredentialsSignin",
      ok: false,
    } as never);
    render(<LoginForm />);

    await fillAndSubmit(user, "joao@example.com", "wrong");

    expect(
      await screen.findByText("Invalid email or password."),
    ).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeEnabled();
  });

  it("should disable the button and show the loading text while signing in", async () => {
    const user = userEvent.setup();
    let resolveSignIn!: (value: unknown) => void;
    mockedSignIn.mockReturnValue(
      new Promise((resolve) => {
        resolveSignIn = resolve;
      }) as never,
    );
    render(<LoginForm />);

    await fillAndSubmit(user);

    const loadingButton = screen.getByRole("button", { name: "Signing in..." });
    expect(loadingButton).toBeDisabled();

    await act(async () => {
      resolveSignIn({ error: undefined, ok: true });
    });

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
  });

  it("should clear the previous error when submitting again", async () => {
    const user = userEvent.setup();
    mockedSignIn
      .mockResolvedValueOnce({ error: "CredentialsSignin", ok: false } as never)
      .mockResolvedValueOnce({ error: undefined, ok: true } as never);
    render(<LoginForm />);

    await fillAndSubmit(user, "joao@example.com", "wrong");
    expect(
      await screen.findByText("Invalid email or password."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
    expect(
      screen.queryByText("Invalid email or password."),
    ).not.toBeInTheDocument();
  });
});

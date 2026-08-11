import { AuthIllustration } from "@/components/auth/AuthIllustration";
import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | BankDash",
};

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <LoginForm />
      <AuthIllustration />
    </div>
  );
}

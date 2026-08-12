import { AuthIllustration } from "@/components/auth/AuthIllustration";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | BankDash",
};

export default function SignUp() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SignUpForm />
      <AuthIllustration />
    </div>
  );
}

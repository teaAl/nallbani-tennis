import { Metadata } from "next";
import LoginForm from "@/components/auth/loginForm";

export const metadata: Metadata = {
  title: "Login | Nallbani Tennis",
  description: "Login to your Nallbani Tennis account",
};

export default function LoginPage() {
  return <LoginForm />;
}

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/auth/registerForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-pear">
      <h1 className="text-4xl font-bold mb-4">Registration Closed</h1>
      <p className="text-lg">
        Registration is only available via an admin. Please contact the club
        administration to create an account.
      </p>
    </div>
  );
}

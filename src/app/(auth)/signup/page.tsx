import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/auth/registerForm";
import Image from "next/image";

export default async function RegisterPage() {
  const session = await getSession();

  // Redirect to dashboard if already logged in
  if (session) {
    redirect("/");
  }

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div
      className={`flex flex-row items-center justify-center h-screen bg-[url('/images/ballsbasket.png')] bg-cover bg-no-repeat bg-bottom`}
    >
      <Image
        src="/images/logo-nt.png"
        alt="Logo"
        width={100}
        height={100}
        className="absolute top-5 left-5"
      />
      <div className="w-1/2 flex flex-col items-center justify-center p-4 bg-gray-900/90 h-full">
        <h1 className="text-pear text-4xl font-poppins font-bold text-shadow-2xs">
          Apply for your membership today!
        </h1>
        <p>BENEFiTS:</p>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center p-4 bg-pear/90 h-full">
        <RegisterForm />
      </div>
    </div>
    // </div>
  );
}

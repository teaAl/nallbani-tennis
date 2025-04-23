// pages/pending.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOpts";
import { redirect } from "next/navigation";
import Head from "next/head";

export default async function PendingPage() {
  const session = await getServerSession(authOptions);
  console.log("session on pending page > ", session);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Head>
        <title>Account Pending - Nallbani Tennis</title>
      </Head>
      <div className="container mx-auto p-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Account Pending Approval
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Your account is currently pending approval by our
                  administrators. You will receive an email notification once
                  your account has been activated.
                </p>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-yellow-800">
                  What to expect:
                </h4>
                <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5">
                  <li>Account approval typically takes 1-2 business days</li>
                  <li>
                    You'll receive a confirmation email once your account is
                    active
                  </li>
                  <li>You can log in anytime to check your status</li>
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-sm text-yellow-700">
                  If you have any questions, please contact us at
                  support@nallbani-tennis.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

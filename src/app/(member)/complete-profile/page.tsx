import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOpts";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Head from "next/head";
import ProfileCompletionFlow from "@/components/member/complete-profile/flow";
import { CompleteProfileProvider } from "@/context/completeProfileProvider";

export default async function CompleteProfilePage() {
  const session = await getServerSession(authOptions);
  console.log("session on pending page > ", session);

  if (!session) {
    redirect("/login");
  }

  return (
    <CompleteProfileProvider>
      <Head>
        <title>Complete Your Profile | Tennis Club</title>
        <meta
          name="description"
          content="Complete your profile to access all features"
        />
      </Head>

      <main className="min-h-screen pt-10 bg-[linear-gradient(to_bottom,rgba(16,24,40,0.9),rgba(16,24,40,1)),url('/images/racquetpattern.jpg')] bg-cover bg-fixed bg-no-repeat">
        <ProfileCompletionFlow id={session.user.id} />
      </main>
    </CompleteProfileProvider>
  );
}

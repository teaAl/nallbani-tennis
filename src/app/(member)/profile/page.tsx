import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOpts";
import prisma from "@/lib/prisma";

import { redirect } from "next/navigation";
import MemberContent from "@/components/member/memberContent";

export default async function MemberPage() {
  const session = await getServerSession(authOptions);

  console.log("session on member profile page > ", session);

  if (!session) {
    redirect("/login");
  }

  // Force a fresh user fetch to get updated status
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { status: true },
  });

  // Use the fresh database status for redirects
  if (user?.status === "UNCOMPLETE") {
    redirect("/complete-profile");
  }

  if (user?.status === "PENDING") {
    redirect("/pending");
  }

  return (
    <>
      <div className="container py-6 mx-auto flex items-center justify-center h-full">
        <MemberContent />
      </div>
    </>
  );
}

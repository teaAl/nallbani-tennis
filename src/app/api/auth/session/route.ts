import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOpts";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  redirect("/");
  const searchParams = req.nextUrl.searchParams;
  const shouldUpdate = searchParams.get("update") === "true";

  if (shouldUpdate) {
    // This will force a session refresh when the client calls this endpoint
    const session = await getServerSession(authOptions);
    return NextResponse.json({ status: "ok" });
  }

  return NextResponse.json({ status: "no update requested" });
}

/*
This API endpoint serves as a session management utility in NextAuth.js

This API is particularly useful when:
- You've made server-side changes to the user's data
- You need to synchronize session state across tabs
- You want to force a session refresh without requiring a full page reload
*/

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOpts";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shouldUpdate = searchParams.get("update") === "true";

  if (shouldUpdate) {
    // This will force a session refresh when the client calls this endpoint
    const session = await getServerSession(authOptions);
    return NextResponse.json({ status: "ok" });
  }

  return NextResponse.json({ status: "no update requested" });
}

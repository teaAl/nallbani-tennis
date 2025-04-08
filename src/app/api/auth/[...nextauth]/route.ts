import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/authOpts";

// Create the handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 
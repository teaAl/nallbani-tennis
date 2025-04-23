import { NextAuthOptions, Session, DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

declare module "next-auth" {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      id: string;
      //   name?: string | null;
      email: string | null;
      //   image?: string | null;
      status: string;
      role: UserRole[];
    } & DefaultSession["user"];
  }

  /**
   * Extend the built-in user types
   */
  interface User {
    status?: string;
    role?: UserRole[];
  }
}

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          //   name: user.name,
          //   image: user.image,
          status: user.status || "PENDING",
          role: user.role as UserRole[],
          user: user,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.status = user.status || "PENDING";
        token.role = user.role;
      }

      if (token.id) {
        const latestUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            id: true,
            status: true,
            role: true,
            // Add other fields you need
          },
        });

        if (latestUser) {
          token.status = latestUser.status;
          token.role = latestUser.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.status = token.status as string;
        session.user.role = token.role as UserRole[];
      }
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   // Redirect to /profile after login
    //   return "/profile";
    // },
  },
};

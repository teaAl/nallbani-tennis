// File: src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/authOpts";

// Create the handler
const handler = NextAuth(authOptions);

// Export the required GET and POST functions
// Export the required GET and POST functions
export { handler as GET, handler as POST };

// import { NextAuthOptions, DefaultSession } from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import NextAuth from "next-auth/next";
// import prisma  from "@/lib/prisma";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//     } & DefaultSession["user"];
//   }
// }

// // File: types/next-auth.d.ts
// // import NextAuth from "next-auth";

// // declare module "next-auth" {
// //   interface Session {
// //     user: {
// //       id: string;
// //       name?: string | null;
// //       email?: string | null;
// //       image?: string | null;
// //     };
// //   }
// // }

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         const user = await prisma.users.findUnique({
//           where: {
//             email: credentials.email
//           }
//         });

//         if (!user || !user.password) {
//           return null;
//         }

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isPasswordValid) {
//           return null;
//         }

//         return {
//           id: user.id.toString(),
//           email: user.email,
//         //   name: user.name,
//         //   image: user.image,
//         };
//       }
//     }),
//     // You can add more providers here (Google, Facebook, etc.)
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// //   pages: {
// //     signIn: "/login",
// //     signOut: "/",
// //     error: "/login",
// //   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
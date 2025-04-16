// import type { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';
// import { authOptions } from '@/lib/authOpts';

// type ResponseData = {
//     message: string;
//     user?: {
//       id: string;
//       status: string;
//     };
//   };

// export const PUT = async () => {
//   try {
//     // Check if user is authenticated and is an admin
//     // const session = await getServerSession(req, res, authOptions);
//     // if (!session || session.user.role !== 'ADMIN') {
//     //   return res.status(401).json({ message: 'Unauthorized' });
//     // }
//     const users = await prisma.user.findUnique({
//         where: {
//             id: id,
//         },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         emailVerified: true,
//         // password: true,
//         avatar: true,
//         role: true,
//         status: true,
//         createdAt: true,
//         phoneNumber: true,
//         level: true,
//       },
//     });

//     return NextResponse.json({ users }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return NextResponse.json(
//       { error: "An error occurred while fetching users." },
//       { status: 500 }
//     );
//   }
// };

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOpts";
import { getServerSession } from "next-auth/next";

type ResponseData = {
  message: string;
  user?: {
    id: string;
    status: string;
  };
};

export const PUT = async (request: Request) => {
  try {
    const body = await request.json(); // Parse the JSON body
    const { userId, status } = body;

    if (
      !userId ||
      !status ||
      !["PENDING", "ACTIVE", "INACTIVE"].includes(status)
    ) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status },
    });

    return NextResponse.json({
      message: "User status updated successfully",
      user: { id: updatedUser.id, status: updatedUser.status },
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   if (req.method !== "PUT") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     // Check if user is authenticated and is an admin
//     // const session = await getServerSession(req, res, authOptions);
//     // if (!session || session.user.role !== 'ADMIN') {
//     //   return res.status(401).json({ message: 'Unauthorized' });
//     // }

//     const { userId, status } = req.body;

//     if (
//       !userId ||
//       !status ||
//       !["PENDING", "ACTIVE", "INACTIVE"].includes(status)
//     ) {
//       return res.status(400).json({ message: "Invalid input" });
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: { status },
//     });

//     return res.status(200).json({
//       message: "User status updated successfully",
//       user: { id: updatedUser.id, status: updatedUser.status },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }

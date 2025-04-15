// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export const GET = async () => {
//   try {
//     const users = await prisma.users.findMany({
//       select: {
//         id: true,
//         email: true,
//         // password: true,
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

import { NextResponse } from "next/server";

// Mock user data
const mockUsers: Array<{ id: string; email: string }> = [
  { id: "1", email: "john.doe@example.com" },
  { id: "2", email: "jane.doe@example.com" },
];

// GET: Fetch all users
export const GET = async () => {
  try {
    return NextResponse.json({ users: mockUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching users." },
      { status: 500 }
    );
  }
};
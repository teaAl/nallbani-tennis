// import prisma from '@/lib/prisma';
// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     try {
//         const { email, password } = req.body;

//         // Check if the user exists
//         const user = await prisma.users.findUnique({
//             where: { email },
//         });

//         if (!user) {
//             return res.status(401).json({ error: 'Invalid username.' });
//         }

//         // Check if the password is correct
//         if (user.password !== password) {
//             return res.status(401).json({ error: 'Invalid password.' });
//         }

//         // If everything is ok, return success
//         return res.status(200).json({ success: true });
//     } catch (error) {
//         res.status(500).json({ error: 'Something went wrong.', details: error });
//     }
// }

import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

// Mock user data
const mockUsers: Array<{ email: string; password: string }> = [
  {
    email: 'john.doe@example.com',
    password: await bcrypt.hash('password123', 10), // Pre-hashed password
  },
  {
    email: 'jane.doe@example.com',
    password: await bcrypt.hash('securepassword', 10), // Pre-hashed password
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Check if the user exists in mock data
    const user = mockUsers.find((user) => user.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username.' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // If everything is ok, return success
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error during session creation:', error);
    res.status(500).json({ error: 'Something went wrong.', details: error });
  }
}
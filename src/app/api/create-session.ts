import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username.' });
        }

        // Check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        // If everything is ok, return success
        return res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong.', details: error });
    }
}
import type { NextApiResponse } from "next";
import prisma from "@/lib/database/prisma/client";

export default async function handler(
    res: NextApiResponse
) {
    try {
        const data = await prisma.user.findMany();
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/database/prisma/client"

type postProps = {
    name: string
}



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const user : postProps = JSON.parse(req.body)
        if (req.method==='POST'){
            try {
                const data = await prisma.user.create({
                    data: {
                        name: user.name
                    },
                })
                res.status(200).json(data)
            } catch (error) {
                return res.status(500).json({message: 'Error creating user'})
            }
        }

    } catch (error) {
        return res.status(500).json(error)
        
    }
}
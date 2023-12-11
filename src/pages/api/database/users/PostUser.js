// Attempts to insert req(user data) to database

import { clientPromise, databaseName } from "@/lib/database/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(databaseName);

        if (req.method === "POST") {
            const userData = req.body;

            const result = await db.collection("Users").insertOne(userData);

            if (result) {
                res.status(201).json({ message: "User created successfully" });
            } else {
                res.status(500).json({ error: "User creation failed" });
            }
        } else {
            res.status(400).json({ error: "Bad Request" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

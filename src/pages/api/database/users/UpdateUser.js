// Checks to see if a user exists in the database by email. Returns true or false. 

import { clientPromise, databaseName } from "@/lib/database/mongodb";


export default async (req, res) => {

    try {
        const client = await clientPromise;
        const db = client.db(databaseName);

        if (req.method === "PATCH") {
            const email = req.query.email;
            //const { updatedData } = req.body;

            if (!email) {
                return res.status(400).json({ error: "email is required" });
            }

            const existingUser = await db.collection("Users").findOne({ email });

            if (existingUser) {
                const updatedData = req.body;
                // Perform the update
                await db.collection("Users").updateOne({ email }, { $set: updatedData });
                return res.status(200).json({ success: 'User updated' });
            } else {
                return res.status(404).json({ error: "User not found" });
            }

        } else {
            return res.status(400).json({ error: "Bad Request" });

        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "An error occurred" });
    }
};

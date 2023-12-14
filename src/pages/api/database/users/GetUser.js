// Checks to see if a user exists in the database by email. Returns user data with all attributes.

import { clientPromise, databaseName } from "@/lib/database/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(databaseName);

        if (req.method === "GET") {
            const { email } = req.query;

            if (!email) {
                return res.status(400).json({ error: "email is required" });
            }

            let userData = await db.collection("Users").findOne({ email });
            if (userData) {
                return res.json(userData); // Send response for existing user
            } else {
                return res.json(null); // Send response for non-existing user
            }
        } else {
            return res.status(400).json({ error: "Bad Request" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "An error occurred" });
    }
};

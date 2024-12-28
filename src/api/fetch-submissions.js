import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            // Connect to MongoDB
            await client.connect();
            const db = client.db("form-submissions"); // Use your database name
            const collection = db.collection("submissions"); // Use your collection name

            // Fetch all submissions
            const submissions = await collection.find().toArray();

            // Return submissions as JSON
            res.status(200).json(submissions);
        } catch (error) {
            console.error("Error fetching submissions:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } finally {
            // Ensure the connection is closed after each request
            await client.close();
        }
    } else {
        // If the method is not GET, return a 405 Method Not Allowed
        res.setHeader("Allow", ["GET"]);
        res.status(405).end("Method Not Allowed");
    }
}

export default async function handler(req, res) {
    console.log("Admin-submissions function executed");
    if (req.method === "GET") {
        try {
            console.log("Connecting to database...");
            const { db } = await connectToDatabase();
            const submissions = await db.collection("submissions").find().toArray();
            console.log("Fetched submissions:", submissions);

            res.status(200).json(submissions);
        } catch (error) {
            console.error("Error fetching submissions:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end("Method Not Allowed");
    }
}

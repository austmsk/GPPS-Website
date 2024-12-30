import { connectToDatabase } from "./db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const formData = req.body;

        // Validate required fields
        if (!formData["first-name"] || !formData["last-name"] || !formData.email || !formData.question) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        // Construct the submission object
        const submission = {
            firstName: formData["first-name"],
            lastName: formData["last-name"],
            email: formData.email,
            phoneNumber: formData["phone-number"] || "N/A",
            relationship: formData.relationship || "N/A",
            contactMethod: formData["contact-method"] || "N/A",
            subject: formData.subject || "General Inquiry",
            question: formData.question,
            consent: formData.consent === "on",
            createdAt: new Date(),
        };

        try {
            // Connect to MongoDB
            const { db } = await connectToDatabase();

            // Insert the submission into the "submissions" collection
            await db.collection("submissions").insertOne(submission);

            // Respond with success
            return res.status(200).json({ message: "Submission saved successfully!" });
        } catch (error) {
            console.error("Error saving submission:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end("Method Not Allowed");
    }
}
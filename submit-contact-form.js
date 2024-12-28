import { connectToDatabase } from "./db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const formData = req.body;

        // Validate input
        if (!formData["first-name"] || !formData["last-name"] || !formData.email || !formData.question) {
            return res.status(400).json({ error: "Missing required fields." });
        }

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
            const { db } = await connectToDatabase();
            await db.collection("submissions").insertOne(submission);
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

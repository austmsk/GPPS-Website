import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
    if (req.method === "POST") {
        const formData = req.body;

        // Validate required fields
        if (!formData["first-name"] || !formData["last-name"] || !formData.email || !formData.question) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        // Sanitize inputs
        const sanitize = (str) => str.replace(/[<>]/g, "").trim();

        // Create an object to store in the database
        const submission = {
            firstName: sanitize(formData["first-name"]),
            lastName: sanitize(formData["last-name"]),
            email: sanitize(formData.email),
            phoneNumber: sanitize(formData["phone-number"] || "N/A"), // Optional
            relationship: sanitize(formData.relationship || "N/A"), // Optional
            contactMethod: sanitize(formData["contact-method"] || "N/A"), // Optional
            subject: sanitize(formData.subject || "General Inquiry"), // Optional
            question: sanitize(formData.question),
            consent: formData.consent === "on", // Checkbox value
            createdAt: new Date(),
        };

        try {
            // Connect to the database
            await client.connect();
            const db = client.db("form-submissions"); // Database name
            const collection = db.collection("submissions"); // Collection name

            // Insert the form submission into the database
            await collection.insertOne(submission);

            // Return success response
            res.status(200).json({ redirect: "/redirecting.html" });
        } catch (error) {
            console.error("Error saving submission:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } finally {
            await client.close();
        }
    } else {
        // Reject non-POST requests
        res.setHeader("Allow", ["POST"]);
        res.status(405).end("Method Not Allowed");
    }
}

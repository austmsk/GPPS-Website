import { connectToDatabase, closeDatabase } from "./api/db.js"
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from the .env file

async function testDatabaseConnection() {
    try {
        const { db } = await connectToDatabase();
        console.log("Testing database operations...");
        
        // Example: List collections
        const collections = await db.listCollections().toArray();
        console.log("Collections in the database:", collections);

        // Example: Insert a test document
        const testCollection = db.collection("test");
        const result = await testCollection.insertOne({ test: "Testing connection", timestamp: new Date() });
        console.log("Test document inserted with ID:", result.insertedId);

        // Example: Fetch the document back
        const document = await testCollection.findOne({ _id: result.insertedId });
        console.log("Fetched test document:", document);
    } catch (error) {
        console.error("Error during database test:", error);
    } finally {
        await closeDatabase(); // Close the database connection
    }
}

testDatabaseConnection();
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const client = new MongoClient(process.env.MongoClient);

export async function connectToDatabase() {
    try {
        console.log("Connecting to MongoDB...");
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
        }
        console.log("MongoDB connected successfully");
        const db = client.db("FORM_SUBMISSIONS");
        return { db, client };
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export async function closeDatabase() {
    try {
        console.log("Closing MongoDB connection...");
        await client.close();
        console.log("MongoDB connection closed");
    } catch (error) {
        console.error("Error closing MongoDB connection:", error);
        throw error;
    }
}
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MongoClient, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export async function connectToDatabase() {
    try {
        console.log("Connecting to MongoDB...");
        if (!client.isConnected()) {
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

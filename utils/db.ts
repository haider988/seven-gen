import mongoose from "mongoose";

export default async function db() {
    if (mongoose.connection.readyState >= 1) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(process.env.DATABASE as string, {
            dbName: "seven-gen", // Add your database name here
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to database");
    }
}

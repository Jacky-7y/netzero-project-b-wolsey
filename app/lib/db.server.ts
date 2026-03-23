import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;

  if (!MONGO_URI) {
    console.error("ERROR: MONGO_URI is not defined in the environment variables");
    throw new Error("Missing MONGO_URI. Please check your .env file.");
  }

  try {
    const conn = await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
    });
    console.log(`Successfully connected to MongoDB via environment variable`);
    return conn;
  } catch (err) {
    console.error("Critical MongoDB Connection Error:", err);
    throw err; 
  }
}
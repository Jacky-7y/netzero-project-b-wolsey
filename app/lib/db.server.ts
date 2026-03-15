import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/antiquealley";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;

  try {
    const conn = await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
    });
    console.log(`Successfully connected to MongoDB: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error("Critical MongoDB Connection Error:", err);
    throw err; 
  }
}
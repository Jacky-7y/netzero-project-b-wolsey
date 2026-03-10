import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/antiquealley";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}
import mongoose from "mongoose";
import { User } from "../models/User";

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI!);
    console.log("✅ MongoDB Connected");

    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      await User.create({
        username: "admin",
        password: "adminPassword123",
        role: "admin"
      });
      console.log("No admin account found, Admin Created: admin / adminPassword123 (Please change this imediately)");
    }
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}
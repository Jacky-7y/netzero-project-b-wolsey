import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In production, HASH THIS LATER RRRAAAAHHHHH
  role: { type: String, default: "admin" }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
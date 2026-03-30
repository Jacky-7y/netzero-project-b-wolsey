import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: "/images/placeholder.jpg" },
  category: { type: String, default: "General" },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
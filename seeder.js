import mongoose from 'mongoose';

const MONGO_URI = "mongodb://127.0.0.1:27017/antiquealley";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected for seeding...");

    await mongoose.connection.db.dropCollection('products').catch(() => {});

    const testProduct = {
      name: "1987 MK3 Supra Turbo",
      description: "Classic sports car with a 7M-GTE engine.",
      price: 25000,
      category: "Automotive",
      stock: 1
    };

    await mongoose.model('Product', new mongoose.Schema({ 
      name: String, description: String, price: Number, category: String, stock: Number 
    })).create(testProduct);

    console.log("Seed Successful: Test product added!");
    process.exit(0);
  } catch (err) {
    console.error("Seed Failed:", err);
    process.exit(1);
  }
}

seed();
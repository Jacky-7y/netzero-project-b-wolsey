// MongoDB Initialization Script for Antique Alley
db = db.getSiblingDB('antiquealley');

db.products.drop();
db.users.drop();

db.products.insertMany([
  {
    name: "Stained Window",
    description: "A Stained window, isn't it cool?",
    price: 150.50,
    imageUrl: "/images/item6.jpg",
    category: "Furniture"
  },
  {
    name: "Oak Table",
    description: "Solid oak table with hand-carved design work on the exterior.",
    price: 499.99,
    imageUrl: "/images/item4.jpg",
    category: "Furniture"
  }
]);

// Note: The seeder in db.server.ts will automatically create 
// the admin user on first run if there are no admin accounts in the User table.
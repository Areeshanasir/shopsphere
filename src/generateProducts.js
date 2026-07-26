const categories = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Home",
  "Watches"
];

const titles = {
  Electronics: [
    "Wireless Headphones",
    "Gaming Mouse",
    "Mechanical Keyboard",
    "Bluetooth Speaker",
    "USB-C Hub",
    "Smartphone Stand",
    "Webcam",
    "Portable SSD",
    "Laptop Sleeve",
    "Wireless Charger",
    "Noise Cancelling Earbuds",
    "Smart Watch"
  ],
  Fashion: [
    "Casual T-Shirt",
    "Slim Fit Jeans",
    "Running Shoes",
    "Leather Jacket",
    "Hoodie",
    "Formal Shirt",
    "Cargo Pants",
    "Sneakers",
    "Baseball Cap",
    "Denim Jacket",
    "Summer Dress",
    "Sports Shorts"
  ],
  Beauty: [
    "Face Wash",
    "Vitamin C Serum",
    "Moisturizer",
    "Lipstick",
    "Perfume",
    "Hair Dryer",
    "Hair Oil",
    "Foundation",
    "Mascara",
    "Sunscreen",
    "Body Lotion",
    "Face Mask"
  ],
  Home: [
    "Coffee Mug",
    "Wall Clock",
    "Desk Lamp",
    "Floor Mat",
    "Storage Basket",
    "Cookware Set",
    "Pillow",
    "Bedsheet Set",
    "Dining Plate",
    "Water Bottle",
    "Plant Pot",
    "Table Organizer"
  ],
  Watches: [
    "Classic Watch",
    "Digital Watch",
    "Luxury Watch",
    "Fitness Watch",
    "Leather Strap Watch",
    "Sports Watch",
    "Analog Watch",
    "Minimal Watch",
    "Chronograph Watch",
    "Smart Watch",
    "Premium Watch",
    "Silver Watch"
  ]
};

const products = [];

let id = 1;

categories.forEach((category) => {
  titles[category].forEach((title) => {
    products.push({
      id: id++,
      title,
      category,
      price: Math.floor(Math.random() * 180) + 20,
      rating: +(Math.random() * 2 + 3).toFixed(1),
      image: `https://picsum.photos/300?random=${id}`
    });
  });
});

import fs from "fs";

fs.writeFileSync(
  "./src/data/db.json",
  JSON.stringify({ products }, null, 2),
  "utf8"
);

console.log("✅ db.json generated successfully!");
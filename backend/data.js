// backend/data.js
export const users = [];

export const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1200 },
  { id: 2, name: 'T-Shirt', category: 'Apparel', price: 25 },
  { id: 3, name: 'Coffee Maker', category: 'Home Goods', price: 80 },
  { id: 4, name: 'Wireless Mouse', category: 'Electronics', price: 40 },
  { id: 5, name: 'Jeans', category: 'Apparel', price: 60 },
  { id: 6, name: 'Book: The Great Gatsby', category: 'Books', price: 15 },

  // --- NEW ITEMS START HERE ---
  { id: 7, name: 'Smart Watch', category: 'Electronics', price: 199 },
  { id: 8, name: 'Chef\'s Knife', category: 'Kitchenware', price: 75 },
  { id: 9, name: 'Ergonomic Desk Chair', category: 'Office', price: 250 },
  { id: 10, name: 'Leather Wallet', category: 'Apparel', price: 50 },
  { id: 11, name: 'Yoga Mat', category: 'Sports', price: 30 },
  { id: 12, name: 'Bluetooth Headphones', category: 'Electronics', price: 120 }
  // --- NEW ITEMS END HERE ---
];

// Carts will be stored as { userId, items: [{ itemId, quantity }] }
export const carts = [];
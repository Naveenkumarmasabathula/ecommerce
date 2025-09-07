// backend/routes/items.js
import express from 'express';
import { items } from '../data.js';
import { protect } from '../authMiddleware.js';

const router = express.Router();

// GET all items with filtering
router.get('/', (req, res) => {
  let filteredItems = [...items];
  const { category, maxPrice } = req.query;

  if (category) {
    filteredItems = filteredItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  if (maxPrice) {
    filteredItems = filteredItems.filter(item => item.price <= parseInt(maxPrice));
  }
  
  res.json(filteredItems);
});

// POST a new item (protected)
router.post('/', protect, (req, res) => {
    const { name, category, price } = req.body;
    const newItem = { id: items.length + 1, name, category, price };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT (update) an item (protected)
router.put('/:id', protect, (req, res) => {
    const { name, category, price } = req.body;
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex > -1) {
        items[itemIndex] = { ...items[itemIndex], name, category, price };
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// DELETE an item (protected)
router.delete('/:id', protect, (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex > -1) {
        items.splice(itemIndex, 1);
        res.json({ message: 'Item deleted' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

export default router;
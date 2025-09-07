// backend/routes/cart.js
import express from 'express';
import { carts, items } from '../data.js';
import { protect } from '../authMiddleware.js';

const router = express.Router();

// Add item to cart
router.post('/', protect, (req, res) => {
  const { itemId, quantity = 1 } = req.body;
  const userId = req.user.id;
  
  const itemExists = items.find(i => i.id === itemId);
  if (!itemExists) {
    return res.status(404).json({ message: 'Item not found' });
  }

  let userCart = carts.find(c => c.userId === userId);

  if (!userCart) {
    userCart = { userId, items: [] };
    carts.push(userCart);
  }

  const cartItemIndex = userCart.items.findIndex(i => i.itemId === itemId);

  if (cartItemIndex > -1) {
    userCart.items[cartItemIndex].quantity += quantity;
  } else {
    userCart.items.push({ itemId, quantity });
  }

  res.status(200).json(userCart);
});

export default router;
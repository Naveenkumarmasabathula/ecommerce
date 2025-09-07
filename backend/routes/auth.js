
// backend/routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({
    id: newUser.id,
    email: newUser.email,
    token: jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
  });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      email: user.email,
      token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

export default router;
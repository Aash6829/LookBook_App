// routes/wardrobe.js
import express from 'express';
import ClothingItem from '../models/ClothingItem.js';

const router = express.Router();

// Add new item
router.post('/', async (req, res) => {
  try {
    const newItem = new ClothingItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await ClothingItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

import express from 'express';
import Favorite from '../models/Favorite.js';

const router = express.Router();

// GET all favorites
router.get('/', async (req, res) => {
  const favorites = await Favorite.find();
  res.json(favorites);
});

// POST new favorite outfit
router.post('/', async (req, res) => {
  const { topwear, bottomwear, footwear, jewelry } = req.body;

  // Check for existing favorite with same combo
  const existing = await Favorite.findOne({
    'topwear._id': topwear._id,
    'bottomwear._id': bottomwear._id,
    'footwear._id': footwear._id,
    'jewelry._id': jewelry._id
  });

  if (existing) {
    return res.status(409).json({ message: 'Outfit already in favorites!' });
  }

  const newFav = new Favorite(req.body);
  const saved = await newFav.save();
  res.json(saved);
});


// DELETE a favorite by ID (optional)
router.delete('/:id', async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;

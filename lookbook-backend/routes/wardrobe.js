// routes/wardrobe.js
import express from 'express';
import ClothingItem from '../models/ClothingItem.js';
import parser from '../middleware/upload.js'; // Note: .js extension is required in ES6

const router = express.Router();
//1st post
// Upload clothing item with image
// router.post('/', parser.single('image'), async (req, res) => {
//   try {
//     const { name, style, type } = req.body;
//     const imageUrl = req.file.path; // Cloudinary URL

//     const newItem = new ClothingItem({ name, style, type, imageUrl });
//     await newItem.save();

//     res.status(201).json(newItem);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to upload item' });
//   }
// });

//2nd version
// router.post('/upload', parser.single('image'), async (req, res) => {
//   try {
//     const { name, type, style } = req.body;
//     const imageUrl = req.file.path;

//     const newItem = new ClothingItem({ name, type, style, imageUrl });
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });
router.post('/upload', parser.single('image'), async (req, res) => {
  try {
    const { name, type, style } = req.body;

    // 🧠 Check if file uploaded
    if (!req.file) {
      console.error("❌ No file received");
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageUrl = req.file.path;
    const newItem = new ClothingItem({ name, type, style, imageUrl });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("🔥 Upload error details:", err);
    res.status(500).json({ error: "Failed to upload item" });
  }
});


// Get all wardrobe items
router.get('/', async (req, res) => {
  try {
    const items = await ClothingItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await ClothingItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Error deleting item' });
  }
});

export default router;

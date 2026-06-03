import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import wardrobeRoutes from './routes/wardrobe.js';
import favoriteRoutes from './routes/favorites.js';
import generatorRoutes from './routes/generator.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ All routes go below `app` initialization
app.use('/api/wardrobe', wardrobeRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/generate-outfit', generatorRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));


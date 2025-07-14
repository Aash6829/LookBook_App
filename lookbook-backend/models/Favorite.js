import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  topwear: Object,
  bottomwear: Object,
  footwear: Object,
  jewelry: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Favorite', FavoriteSchema);

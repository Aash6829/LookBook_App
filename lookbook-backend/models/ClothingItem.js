// models/ClothingItem.js
import mongoose from 'mongoose';

const clothingItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['topwear', 'bottomwear', 'footwear', 'jewelry'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: String, // Optional for now
  style: {
    type: String,
    enum: ['formal', 'casual', 'party', 'ethnic'],
    required: true,
  }
});

export default mongoose.model('ClothingItem', clothingItemSchema);

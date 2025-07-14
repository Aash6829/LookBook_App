// src/components/UploadForm.jsx
import React, { useState } from 'react';
import { addWardrobeItem } from '../services/wardrobeAPI';

const UploadForm = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    type: 'topwear',
    name: '',
    style: 'casual',
    imageUrl: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = await addWardrobeItem(formData);
    onItemAdded(newItem);
    setFormData({ type: 'topwear', name: '', style: 'casual', imageUrl: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Wardrobe Item</h3>
      <input name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
      <input name="imageUrl" placeholder="Image URL" onChange={handleChange} value={formData.imageUrl} />
      <select name="type" onChange={handleChange} value={formData.type}>
        <option value="topwear">Topwear</option>
        <option value="bottomwear">Bottomwear</option>
        <option value="footwear">Footwear</option>
        <option value="jewelry">Jewelry</option>
      </select>
      <select name="style" onChange={handleChange} value={formData.style}>
        <option value="casual">Casual</option>
        <option value="formal">Formal</option>
        <option value="party">Party</option>
        <option value="ethnic">Ethnic</option>
      </select>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default UploadForm;

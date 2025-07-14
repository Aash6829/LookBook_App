// src/services/wardrobeAPI.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/wardrobe';

export const getWardrobe = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const addWardrobeItem = async (item) => {
  const res = await axios.post(API_BASE, item);
  return res.data;
};

export const addClothingItem = async (item) => {
  const res = await fetch('http://localhost:5000/api/wardrobe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return await res.json();
};

export const saveFavorite = async (outfit) => {
  const res = await fetch('http://localhost:5000/api/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(outfit)
  });
  return await res.json();
};

export const getFavorites = async () => {
  const res = await fetch('http://localhost:5000/api/favorites');
  return await res.json();
};

export const deleteFavorite = async (id) => {
  await fetch(`http://localhost:5000/api/favorites/${id}`, {
    method: 'DELETE'
  });
};

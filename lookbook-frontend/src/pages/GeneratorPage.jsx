// src/pages/GeneratorPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWardrobe } from '../services/wardrobeAPI';

const GeneratorPage = () => {
  const { styleName } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [outfit, setOutfit] = useState({
    topwear: null,
    bottomwear: null,
    footwear: null,
    jewelry: null,
  });

  useEffect(() => {
    const fetchItems = async () => {
      const allItems = await getWardrobe();
      const filtered = allItems.filter(item => item.style === styleName);
      setItems(filtered);
    };
    fetchItems();
  }, [styleName]);

  const getRandomItem = (type) => {
    const filtered = items.filter(item => item.type === type);
    return filtered.length ? filtered[Math.floor(Math.random() * filtered.length)] : null;
  };

  const generateOutfit = () => {
    setOutfit({
      topwear: getRandomItem('topwear'),
      bottomwear: getRandomItem('bottomwear'),
      footwear: getRandomItem('footwear'),
      jewelry: getRandomItem('jewelry'),
    });
  };

  const shuffleItem = (type) => {
    setOutfit(prev => ({
      ...prev,
      [type]: getRandomItem(type)
    }));
  };

  useEffect(() => {
    if (items.length) generateOutfit();
  }, [items]);

  const goToFavorites = () => {
    navigate('/dashboard/favorites');
  };

  const saveToFavorites = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outfit)
      });

      if (res.status === 409) {
        alert("This outfit is already in your favorites!");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to save favorite");
      }

      await res.json();
      alert("Outfit saved to favorites! ❤️");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving.");
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard/wardrobe', { state: { fromStyle: styleName } });
  };

  const goBack = () => {
    navigate('/', { replace: true }); // Always go to MainPage
  };

  return (
    <div style={{ position: 'relative', paddingBottom: '100px' }}>
      <h2>🎯 {styleName.charAt(0).toUpperCase() + styleName.slice(1)} Look</h2>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {['topwear', 'bottomwear', 'footwear', 'jewelry'].map((type) => (
          outfit[type] ? (
            <div
              key={type}
              style={{
                width: 180,
                border: '1px solid #ccc',
                padding: 10,
                cursor: 'pointer'
              }}
              onClick={() => shuffleItem(type)}
            >
              <img src={outfit[type].imageUrl} alt={type} style={{ width: '100%' }} />
              <h4>{outfit[type].name}</h4>
              <p>{type} | {outfit[type].style}</p>
              <p style={{ fontSize: '0.8em', color: '#666' }}>Click to shuffle 🔁</p>
            </div>
          ) : null
        ))}
      </div>

      <button onClick={generateOutfit} style={{ marginTop: '20px' }}>
        🔀 Generate New Outfit
      </button>

      {/* Go Back Button */}
      <button
        onClick={goBack}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          background: '#333',
          color: '#fff',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ⬅ Go Back
      </button>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#eee',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
        borderTop: '1px solid #ccc',
      }}>
        <button onClick={saveToFavorites}>💾 Save</button>
        <button onClick={goToDashboard}>📦 Wardrobe</button>
        <button onClick={goToFavorites}>💖 Favorites</button>
      </div>
    </div>
  );
};

export default GeneratorPage;

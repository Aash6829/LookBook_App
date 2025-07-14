import React, { useState, useEffect } from 'react';

const OutfitDisplay = ({ items }) => {
  const [outfit, setOutfit] = useState({
    topwear: null,
    bottomwear: null,
    footwear: null,
    jewelry: null,
  });

  // Helper to randomly pick an item from a type
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
    generateOutfit(); // initial
  }, [items]);

  return (
    <div>
      <h2>Your Outfit ✨</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
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
      <button onClick={generateOutfit} style={{ marginTop: '20px' }}>🔀 Generate New Outfit</button>
    </div>
  );
};

export default OutfitDisplay;

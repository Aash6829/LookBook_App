import React, { useEffect, useState } from 'react';
import { getFavorites, deleteFavorite } from '../../services/wardrobeAPI';
import BackButton from '../../components/BackButton';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getFavorites();
      setFavorites(data);
    };
    fetch();
  }, []);

  const removeFavorite = async (id) => {
    await deleteFavorite(id);
    setFavorites(prev => prev.filter(fav => fav._id !== id));
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      <h3>❤️ Saved Outfits</h3>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {favorites.map(fav => (
            <div key={fav._id} style={{ border: '1px solid #ccc', padding: 10 }}>
              {['topwear', 'bottomwear', 'footwear', 'jewelry'].map(type => (
                fav[type] && (
                  <div key={type}>
                    <img src={fav[type].imageUrl} alt={type} style={{ width: 120 }} />
                    <p>{fav[type].name}</p>
                  </div>
                )
              ))}
              <button
                onClick={() => removeFavorite(fav._id)}
                style={{
                  marginTop: '10px',
                  padding: '6px 12px',
                  background: '#ff4d4d',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  borderRadius: '6px'
                }}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <BackButton />
    </div>
  );
};

export default FavoritesPage;

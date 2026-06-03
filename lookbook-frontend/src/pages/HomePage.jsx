// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = ['casual', 'formal', 'party', 'ethnic'];

const HomePage = () => {
  const navigate = useNavigate();

  const handleStyleClick = (style) => {
    navigate(`/style/${style}`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>🧥 How are we styling today?</h1>
      <p>Select a vibe to get started:</p>

      {/* 2 starts
      2 ends */}
      {/* AI Outfit Generator Button */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => navigate('/ai-generator')}
          style={{
            padding: '10px 25px',
            fontSize: '16px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '30px'
          }}
        >
          🤖 AI Outfit Generator
        </button>
      </div>

      {/* Style Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          marginTop: '10px'
        }}
      >
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => handleStyleClick(style)}
            style={{
              padding: '10px 20px',
              fontSize: '18px',
              borderRadius: '10px',
              border: '2px solid #333',
              cursor: 'pointer',
              backgroundColor: '#f0f0f0',
              textTransform: 'capitalize',
              transition: '0.2s'
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

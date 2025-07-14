import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        marginTop: '20px',
        padding: '8px 16px',
        border: 'none',
        backgroundColor: '#444',
        color: '#fff',
        borderRadius: '6px',
        cursor: 'pointer'
      }}
    >
      ⬅ Go Back
    </button>
  );
};

export default BackButton;

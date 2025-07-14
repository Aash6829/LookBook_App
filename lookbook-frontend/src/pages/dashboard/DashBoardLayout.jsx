import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const DashBoardLayout = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    padding: '10px 20px',
    backgroundColor: location.pathname === path ? '#ccc' : '#eee',
    marginRight: '10px',
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#000',
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>📦 Dashboard</h2>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/dashboard/wardrobe" style={linkStyle('/dashboard/wardrobe')}>👕 Wardrobe</Link>
        <Link to="/dashboard/favorites" style={linkStyle('/dashboard/favorites')}>💖 Favorites</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;

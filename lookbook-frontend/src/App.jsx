import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import GeneratorPage from './pages/GeneratorPage';
import WardrobePage from './pages/dashboard/WardrobePage';
import FavoritesPage from './pages/dashboard/FavoritesPage';
import DashBoardLayout from './pages/dashboard/DashBoardLayout';

//2
import AIGeneratorPage from './pages/AIGeneratorPage';

//2 ends 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/style/:styleName" element={<GeneratorPage />} />
        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route path="wardrobe" element={<WardrobePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
        <Route path="/ai-generator" element={<AIGeneratorPage />} />
      </Routes>
    </Router>
  );
}

export default App;

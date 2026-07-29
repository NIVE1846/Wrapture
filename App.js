import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductMode from './pages/ProductMode';
import VisionMode from './pages/VisionMode';
import Dashboard from './pages/Dashboard';
import Simulator from './pages/Simulator';
import Scanner from './pages/Scanner';
import Quests from './pages/Quests';
import ReviewScanner from './pages/ReviewScanner';
import TrashGPT from './components/TrashGPT';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-mode" element={<ProductMode />} />
            <Route path="/vision-mode" element={<VisionMode />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/review-scanner" element={<ReviewScanner />} />
          </Routes>
        </main>
        <TrashGPT />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App; 
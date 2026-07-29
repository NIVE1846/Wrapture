import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  RotateCcw, 
  Eye, 
  Settings, 
  Leaf, 
  Cloud, 
  DollarSign,
  Award,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

// Simple 3D-like components using CSS
const PackagingBox = ({ material, color, size = [1, 1, 1] }) => {
  return (
    <div 
      className="relative transform-gpu animate-spin-slow"
      style={{
        width: `${size[0] * 100}px`,
        height: `${size[1] * 100}px`,
        transform: `rotateY(${Date.now() * 0.01}deg)`,
      }}
    >
      <div 
        className="absolute inset-0 rounded-lg shadow-lg"
        style={{ 
          backgroundColor: color,
          transform: 'rotateX(45deg) rotateZ(45deg)',
        }}
      />
    </div>
  );
};

const PackagingSphere = ({ material, color, size = 1 }) => {
  return (
    <div 
      className="relative transform-gpu animate-spin-slow"
      style={{
        width: `${size * 100}px`,
        height: `${size * 100}px`,
      }}
    >
      <div 
        className="absolute inset-0 rounded-full shadow-lg"
        style={{ 
          backgroundColor: color,
          transform: 'rotateX(45deg)',
        }}
      />
    </div>
  );
};

const PackagingCylinder = ({ material, color, size = [0.5, 1, 0.5] }) => {
  return (
    <div 
      className="relative transform-gpu animate-spin-slow"
      style={{
        width: `${size[0] * 100}px`,
        height: `${size[1] * 100}px`,
      }}
    >
      <div 
        className="absolute inset-0 rounded-full shadow-lg"
        style={{ 
          backgroundColor: color,
          transform: 'rotateX(45deg)',
        }}
      />
    </div>
  );
};

const Simulator = () => {
  const [selectedPackaging, setSelectedPackaging] = useState(0);
  const [viewMode, setViewMode] = useState('3d');

  const packagingOptions = [
    {
      id: 1,
      name: 'Recycled Paper Envelope',
      type: 'box',
      color: '#8B4513',
      size: [1, 1, 0.8],
      material: 'Recycled Paper',
      carbonFootprint: '0.2kg CO₂',
      cost: '$0.50',
      ecoPoints: 5,
      description: 'Lightweight and eco-friendly'
    },
    {
      id: 2,
      name: 'Corrugated Cardboard',
      type: 'box',
      color: '#D2691E',
      size: [1.2, 1, 1],
      material: 'Recycled Cardboard',
      carbonFootprint: '0.5kg CO₂',
      cost: '$1.50',
      ecoPoints: 10,
      description: 'Balanced protection and sustainability'
    },
    {
      id: 3,
      name: 'Bubble Wrap Package',
      type: 'box',
      color: '#32CD32',
      size: [1.5, 1.2, 1.2],
      material: 'Bubble Wrap + Cardboard',
      carbonFootprint: '0.8kg CO₂',
      cost: '$2.50',
      ecoPoints: 15,
      description: 'Premium protection with eco-friendly materials'
    },
    {
      id: 4,
      name: 'Biodegradable Foam',
      type: 'sphere',
      color: '#90EE90',
      size: 1.2,
      material: 'Plant-based Foam',
      carbonFootprint: '0.3kg CO₂',
      cost: '$1.80',
      ecoPoints: 12,
      description: 'Natural protection with minimal impact'
    },
    {
      id: 5,
      name: 'Recycled Plastic Tube',
      type: 'cylinder',
      color: '#87CEEB',
      size: [0.8, 1.5, 0.8],
      material: 'Recycled PET',
      carbonFootprint: '0.4kg CO₂',
      cost: '$2.00',
      ecoPoints: 8,
      description: 'Durable and reusable packaging'
    }
  ];

  const currentPackaging = packagingOptions[selectedPackaging];

  const renderPackaging = () => {
    switch (currentPackaging.type) {
      case 'sphere':
        return <PackagingSphere {...currentPackaging} />;
      case 'cylinder':
        return <PackagingCylinder {...currentPackaging} />;
      default:
        return <PackagingBox {...currentPackaging} />;
    }
  };

  const nextPackaging = () => {
    setSelectedPackaging((prev) => (prev + 1) % packagingOptions.length);
  };

  const prevPackaging = () => {
    setSelectedPackaging((prev) => 
      prev === 0 ? packagingOptions.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green/10 to-eco-blue/10 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Driven Packaging Simulator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore different eco-friendly packaging options and see their environmental impact in real-time
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Viewer */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                <Package className="w-6 h-6 mr-2 text-eco-green" />
                3D Packaging Preview
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === '3d' 
                      ? 'bg-eco-green text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('stats')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'stats' 
                      ? 'bg-eco-green text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {renderPackaging()}
              </div>
              
              {/* Navigation Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <button
                  onClick={prevPackaging}
                  className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextPackaging}
                  className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Packaging Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Current Packaging Info */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {currentPackaging.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {currentPackaging.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center p-3 bg-eco-green/10 rounded-lg">
                  <Leaf className="w-5 h-5 text-eco-green mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Material</p>
                    <p className="font-semibold text-gray-900">{currentPackaging.material}</p>
                  </div>
                </div>
                
                                 <div className="flex items-center p-3 bg-eco-blue/10 rounded-lg">
                   <Cloud className="w-5 h-5 text-eco-blue mr-3" />
                   <div>
                     <p className="text-sm text-gray-600">Carbon Footprint</p>
                     <p className="font-semibold text-gray-900">{currentPackaging.carbonFootprint}</p>
                   </div>
                 </div>
                
                <div className="flex items-center p-3 bg-eco-yellow/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-eco-yellow mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="font-semibold text-gray-900">{currentPackaging.cost}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-eco-orange/10 rounded-lg">
                  <Award className="w-5 h-5 text-eco-orange mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Eco Points</p>
                    <p className="font-semibold text-gray-900">{currentPackaging.ecoPoints}</p>
                  </div>
                </div>
              </div>

              <button className="w-full btn-primary">
                Use This Packaging
              </button>
            </div>

            {/* Packaging Options */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Available Options
              </h3>
              <div className="space-y-2">
                {packagingOptions.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedPackaging(index)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedPackaging === index
                        ? 'bg-eco-green text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.name}</span>
                      <span className="text-sm opacity-75">{option.cost}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Simulator; 
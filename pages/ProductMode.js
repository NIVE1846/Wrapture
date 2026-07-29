import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Leaf, DollarSign, Award, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductMode = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock product database
  const products = [
    { id: 'PROD001', name: 'Smartphone', fragility: 'High', size: 'Medium', weight: '150g', type: 'Electronics' },
    { id: 'PROD002', name: 'Coffee Mug', fragility: 'Medium', size: 'Small', weight: '300g', type: 'Kitchenware' },
    { id: 'PROD003', name: 'Laptop', fragility: 'High', size: 'Large', weight: '2.5kg', type: 'Electronics' },
    { id: 'PROD004', name: 'T-Shirt', fragility: 'Low', size: 'Medium', weight: '150g', type: 'Clothing' },
    { id: 'PROD005', name: 'Glass Vase', fragility: 'Very High', size: 'Medium', weight: '500g', type: 'Home Decor' },
    { id: 'PROD006', name: 'Book', fragility: 'Low', size: 'Small', weight: '400g', type: 'Books' },
    { id: 'PROD007', name: 'Sneakers', fragility: 'Low', size: 'Medium', weight: '800g', type: 'Footwear' },
    { id: 'PROD008', name: 'Ceramic Plate', fragility: 'High', size: 'Medium', weight: '600g', type: 'Kitchenware' }
  ];

  // Mock AI recommendation engine
  const generateRecommendation = (product) => {
    const recommendations = {
      'High': {
        material: 'Bubble Wrap + Corrugated Cardboard',
        carbonFootprint: '0.8kg CO₂',
        costDifference: '+$2.50',
        ecoPoints: 15,
        description: 'Premium protection with eco-friendly materials'
      },
      'Very High': {
        material: 'Biodegradable Foam + Recycled Cardboard',
        carbonFootprint: '1.2kg CO₂',
        costDifference: '+$4.00',
        ecoPoints: 25,
        description: 'Maximum protection with sustainable materials'
      },
      'Medium': {
        material: 'Recycled Paper + Cardboard',
        carbonFootprint: '0.5kg CO₂',
        costDifference: '+$1.50',
        ecoPoints: 10,
        description: 'Balanced protection and sustainability'
      },
      'Low': {
        material: 'Recycled Paper Envelope',
        carbonFootprint: '0.2kg CO₂',
        costDifference: '+$0.50',
        ecoPoints: 5,
        description: 'Lightweight and eco-friendly'
      }
    };

    return recommendations[product.fragility] || recommendations['Medium'];
  };

  const handleProductSelect = async () => {
    if (!selectedProduct) {
      toast.error('Please select a product first!');
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const product = products.find(p => p.id === selectedProduct);
      const rec = generateRecommendation(product);
      
      setRecommendation({
        product,
        ...rec
      });
      
      setIsLoading(false);
      toast.success('AI recommendation generated! 🌱');
    }, 2000);
  };

  const handleUsePackaging = () => {
    toast.success('Eco-packaging selected! +25 Eco Points earned! 🎉');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-eco-green to-eco-blue rounded-xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product-ID Mode
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a product from our database and get AI-powered eco-packaging recommendations 
            based on fragility, size, weight, and type.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Package className="w-6 h-6 mr-2 text-eco-green" />
              Select Product
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Product ID
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                >
                  <option value="">Select a product...</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.id} - {product.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card bg-gray-50"
                >
                  <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <p className="font-medium">{products.find(p => p.id === selectedProduct)?.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <p className="font-medium">{products.find(p => p.id === selectedProduct)?.type}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Fragility:</span>
                      <p className="font-medium">{products.find(p => p.id === selectedProduct)?.fragility}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Size:</span>
                      <p className="font-medium">{products.find(p => p.id === selectedProduct)?.size}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Weight:</span>
                      <p className="font-medium">{products.find(p => p.id === selectedProduct)?.weight}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <button
                onClick={handleProductSelect}
                disabled={!selectedProduct || isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate AI Recommendation
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* AI Recommendation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Leaf className="w-6 h-6 mr-2 text-eco-green" />
              AI Recommendation
            </h2>

            {!recommendation ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  Select a product and generate an AI recommendation to see eco-packaging suggestions.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Recommendation Card */}
                <div className="bg-gradient-to-r from-eco-green to-green-600 text-white rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-2">Recommended Packaging</h3>
                  <p className="text-green-100 mb-4">{recommendation.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <div className="text-sm text-green-100">Material</div>
                      <div className="font-semibold">{recommendation.material}</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <div className="text-sm text-green-100">Carbon Footprint</div>
                      <div className="font-semibold">{recommendation.carbonFootprint}</div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="card text-center">
                    <DollarSign className="w-8 h-8 text-eco-green mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{recommendation.costDifference}</div>
                    <div className="text-sm text-gray-600">Cost Difference</div>
                  </div>
                  <div className="card text-center">
                    <Award className="w-8 h-8 text-eco-yellow mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">+{recommendation.ecoPoints}</div>
                    <div className="text-sm text-gray-600">Eco Points</div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleUsePackaging}
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Use This Packaging
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductMode; 
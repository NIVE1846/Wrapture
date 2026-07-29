import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Camera, Upload, Eye, Edit3, CheckCircle, Package, Leaf, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const VisionMode = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setAnalysis(null);
        setEditedInfo(null);
      };
      reader.readAsDataURL(file);
      toast.success('Image uploaded successfully! 📸');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  });

  // Mock AI analysis
  const analyzeImage = () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first!');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockAnalysis = {
        dimensions: {
          width: '12cm',
          height: '8cm',
          depth: '3cm'
        },
        weight: '250g',
        shape: 'Rectangular',
        material: 'Plastic',
        fragility: 'Medium',
        type: 'Electronics',
        barcode: '1234567890123',
        confidence: 0.87
      };

      setAnalysis(mockAnalysis);
      setEditedInfo(mockAnalysis);
      setIsAnalyzing(false);
      toast.success('AI analysis complete! 🤖');
    }, 3000);
  };

  const handleEditInfo = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setAnalysis(editedInfo);
    toast.success('Information updated! ✏️');
  };

  const handleCancelEdit = () => {
    setEditedInfo(analysis);
    setIsEditing(false);
  };

  const generateRecommendation = (info) => {
    const recommendations = {
      'High': {
        material: 'Bubble Wrap + Corrugated Cardboard',
        carbonFootprint: '0.8kg CO₂',
        costDifference: '+$2.50',
        ecoPoints: 15,
        description: 'Premium protection with eco-friendly materials'
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

    return recommendations[info.fragility] || recommendations['Medium'];
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
            <div className="w-16 h-16 bg-gradient-to-r from-eco-blue to-blue-600 rounded-xl flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vision-Based Mode
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a product image and let our AI analyze dimensions, shape, and material 
            to provide personalized eco-packaging recommendations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Upload className="w-6 h-6 mr-2 text-eco-blue" />
              Upload Product Image
            </h2>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-200 ${
                isDragActive
                  ? 'border-eco-blue bg-blue-50'
                  : 'border-gray-300 hover:border-eco-blue hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              {uploadedImage ? (
                <div className="space-y-4">
                  <img
                    src={uploadedImage}
                    alt="Uploaded product"
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                  <p className="text-sm text-gray-600">
                    Click or drag to replace image
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      or click to select a file
                    </p>
                  </div>
                </div>
              )}
            </div>

            {uploadedImage && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Analyze with AI
                  </>
                )}
              </motion.button>
            )}
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-eco-blue" />
              AI Analysis Results
            </h2>

            {!analysis ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  Upload an image and analyze it to see AI-powered insights.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Analysis Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Detected Information</h3>
                    <button
                      onClick={handleEditInfo}
                      className="text-eco-blue hover:text-blue-600 text-sm flex items-center"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                          <input
                            type="text"
                            value={`${editedInfo.dimensions.width} x ${editedInfo.dimensions.height} x ${editedInfo.dimensions.depth}`}
                            onChange={(e) => {
                              const [w, h, d] = e.target.value.split(' x ');
                              setEditedInfo({
                                ...editedInfo,
                                dimensions: { width: w, height: h, depth: d }
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                          <input
                            type="text"
                            value={editedInfo.weight}
                            onChange={(e) => setEditedInfo({ ...editedInfo, weight: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Shape</label>
                          <input
                            type="text"
                            value={editedInfo.shape}
                            onChange={(e) => setEditedInfo({ ...editedInfo, shape: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                          <input
                            type="text"
                            value={editedInfo.material}
                            onChange={(e) => setEditedInfo({ ...editedInfo, material: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Fragility</label>
                          <select
                            value={editedInfo.fragility}
                            onChange={(e) => setEditedInfo({ ...editedInfo, fragility: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <input
                            type="text"
                            value={editedInfo.type}
                            onChange={(e) => setEditedInfo({ ...editedInfo, type: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="btn-secondary text-sm px-4 py-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Dimensions:</span>
                        <p className="font-medium">{analysis.dimensions.width} x {analysis.dimensions.height} x {analysis.dimensions.depth}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Weight:</span>
                        <p className="font-medium">{analysis.weight}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Shape:</span>
                        <p className="font-medium">{analysis.shape}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Material:</span>
                        <p className="font-medium">{analysis.material}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Fragility:</span>
                        <p className="font-medium">{analysis.fragility}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <p className="font-medium">{analysis.type}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Barcode:</span>
                        <p className="font-medium">{analysis.barcode}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Confidence:</span>
                        <p className="font-medium">{(analysis.confidence * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommendation */}
                {!isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-eco-green to-green-600 text-white rounded-xl p-6"
                  >
                    <h3 className="text-xl font-semibold mb-2">AI Recommendation</h3>
                    {(() => {
                      const rec = generateRecommendation(analysis);
                      return (
                        <>
                          <p className="text-green-100 mb-4">{rec.description}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white bg-opacity-20 rounded-lg p-3">
                              <div className="text-sm text-green-100">Material</div>
                              <div className="font-semibold">{rec.material}</div>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-3">
                              <div className="text-sm text-green-100">Carbon Footprint</div>
                              <div className="font-semibold">{rec.carbonFootprint}</div>
                            </div>
                          </div>
                          <button className="w-full btn-primary mt-4 bg-white text-eco-green hover:bg-gray-100 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Use This Packaging
                          </button>
                        </>
                      );
                    })()}
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VisionMode; 
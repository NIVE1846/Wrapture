import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  FileText, 
  Upload, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Leaf,
  Cloud,
  Recycle,
  Package
} from 'lucide-react';
import toast from 'react-hot-toast';

const Scanner = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [scanResults, setScanResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setScanResults(null);
      };
      reader.readAsDataURL(file);
      toast.success('Label image uploaded! 📸');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  });

  const scanLabel = () => {
    if (!uploadedImage) {
      toast.error('Please upload a label image first!');
      return;
    }

    setIsScanning(true);
    
    // Simulate OCR scanning
    setTimeout(() => {
      const mockResults = {
        productName: 'Eco-Friendly Water Bottle',
        materials: [
          { name: 'Bottle Body', material: 'PET Plastic', recyclable: true, instructions: 'Rinse and recycle' },
          { name: 'Cap', material: 'PP Plastic', recyclable: true, instructions: 'Remove and recycle separately' },
          { name: 'Label', material: 'Paper', recyclable: true, instructions: 'Remove and recycle' },
          { name: 'Shrink Sleeve', material: 'PVC', recyclable: false, instructions: 'Remove before recycling' }
        ],
        overallRecyclability: 85,
        recommendations: [
          'Remove shrink sleeve before recycling',
          'Rinse bottle thoroughly',
          'Check local recycling guidelines',
          'Consider reusable alternatives'
        ]
      };

      setScanResults(mockResults);
      setIsScanning(false);
      toast.success('Label analysis complete! 🔍');
    }, 3000);
  };

  const getRecyclabilityColor = (percentage) => {
    if (percentage >= 80) return 'text-eco-green';
    if (percentage >= 60) return 'text-eco-yellow';
    return 'text-eco-red';
  };

  const getRecyclabilityIcon = (recyclable) => {
    return recyclable ? (
      <CheckCircle className="w-5 h-5 text-eco-green" />
    ) : (
      <XCircle className="w-5 h-5 text-eco-red" />
    );
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
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Label Scanner
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload product labels and get instant recyclability analysis for each component.
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
              <Upload className="w-6 h-6 mr-2 text-purple-500" />
              Upload Label Image
            </h2>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-200 ${
                isDragActive
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-500 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              {uploadedImage ? (
                <div className="space-y-4">
                  <img
                    src={uploadedImage}
                    alt="Uploaded label"
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                  <p className="text-sm text-gray-600">
                    Click or drag to replace image
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {isDragActive ? 'Drop the label here' : 'Drag & drop a label image here'}
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
                onClick={scanLabel}
                disabled={isScanning}
                className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scanning with AI...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Scan Label
                  </>
                )}
              </motion.button>
            )}
          </motion.div>

          {/* Scan Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-purple-500" />
              Scan Results
            </h2>

            {!scanResults ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  Upload a label image and scan it to see recyclability analysis.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Product Info */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-2">{scanResults.productName}</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Recycle className="w-5 h-5 mr-2" />
                      <span className="text-sm">Overall Recyclability</span>
                    </div>
                    <div className={`text-2xl font-bold ${getRecyclabilityColor(scanResults.overallRecyclability)}`}>
                      {scanResults.overallRecyclability}%
                    </div>
                  </div>
                </div>

                {/* Materials Analysis */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Materials Breakdown</h3>
                  <div className="space-y-3">
                    {scanResults.materials.map((material, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{material.name}</span>
                          {getRecyclabilityIcon(material.recyclable)}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Material: {material.material}
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">Instructions:</span> {material.instructions}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Leaf className="w-5 h-5 mr-2 text-eco-green" />
                    Eco Recommendations
                  </h3>
                  <div className="space-y-2">
                    {scanResults.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-eco-green rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="bg-gradient-to-r from-eco-green to-green-600 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Environmental Impact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <div className="text-sm text-green-100">CO₂ Saved</div>
                      <div className="font-semibold">0.3kg</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                      <div className="text-sm text-green-100">Eco Points</div>
                      <div className="font-semibold">+15</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Scanner; 
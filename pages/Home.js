import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Camera, 
  BarChart3, 
  Gamepad2, 
  FileText, 
  Brain, 
  Leaf, 
  Globe, 
  Award,
  TrendingUp
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: 'Product-ID Mode',
      description: 'Select products and get AI-powered eco-packaging recommendations',
      path: '/product-mode',
      color: 'from-eco-green to-green-600'
    },
    {
      icon: Camera,
      title: 'Vision-Based Mode',
      description: 'Upload product images for instant packaging analysis',
      path: '/vision-mode',
      color: 'from-eco-blue to-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Impact Dashboard',
      description: 'Track your environmental impact and achievements',
      path: '/dashboard',
      color: 'from-eco-yellow to-yellow-600'
    },
    {
      icon: Gamepad2,
      title: '3D Simulator',
      description: 'Visualize packaging in 3D with environmental stats',
      path: '/simulator',
      color: 'from-eco-orange to-orange-600'
    },
    {
      icon: FileText,
      title: 'Label Scanner',
      description: 'Scan product labels for recyclability analysis',
      path: '/scanner',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Brain,
      title: 'Review Scanner',
      description: 'Analyze customer reviews for sustainability insights',
      path: '/review-scanner',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const stats = [
    { icon: Leaf, value: '2.5kg', label: 'CO₂ Saved', color: 'text-eco-green' },
    { icon: Globe, value: '15', label: 'Trees Planted', color: 'text-eco-blue' },
    { icon: Award, value: '250', label: 'Eco Points', color: 'text-eco-yellow' },
    { icon: TrendingUp, value: '85%', label: 'Success Rate', color: 'text-eco-orange' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-eco-green to-eco-blue rounded-2xl flex items-center justify-center">
                <Leaf className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-eco-green to-eco-blue bg-clip-text text-transparent">
                Wrapture
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered eco-packaging system that revolutionizes sustainable packaging recommendations. 
              Choose your mode and start making a difference today!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card text-center">
                <div className={`w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Mode
          </h2>
          <p className="text-lg text-gray-600">
            Select the mode that best fits your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link to={feature.path}>
                  <div className="card h-full hover:shadow-xl transition-all duration-300 group-hover:border-eco-green">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="card text-center bg-gradient-to-r from-eco-green to-eco-blue text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Go Green?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Start your eco-packaging journey today and make a positive impact on the environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/product-mode">
              <button className="btn-primary bg-white text-eco-green hover:bg-gray-100">
                Try Product Mode
              </button>
            </Link>
            <Link to="/vision-mode">
              <button className="btn-secondary bg-transparent border-2 border-white hover:bg-white hover:text-eco-green">
                Try Vision Mode
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 
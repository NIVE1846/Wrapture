import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Leaf, 
  Globe, 
  Award, 
  TrendingUp, 
  Calendar,
  Target,
  Zap,
  DollarSign,
  Star,
  Package,
  CheckCircle,
  Cloud
} from 'lucide-react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data
  const impactData = {
    co2Saved: 2.5,
    treesPlanted: 15,
    ecoPoints: 250,
    packagesOptimized: 45,
    costSaved: 125.50,
    successRate: 85
  };

  const achievements = [
    { id: 1, name: 'Green Seller', description: 'Used eco-packaging for 10+ orders', icon: Star, earned: true },
    { id: 2, name: 'CO₂ Warrior', description: 'Saved 2kg+ of CO₂ emissions', icon: Cloud, earned: true },
    { id: 3, name: 'Tree Hugger', description: 'Contributed to planting 10+ trees', icon: Leaf, earned: true },
    { id: 4, name: 'Eco Master', description: 'Earned 500+ eco points', icon: Award, earned: false },
    { id: 5, name: 'Perfect Score', description: '100% success rate for a month', icon: Target, earned: false },
    { id: 6, name: 'Cost Saver', description: 'Saved $200+ on packaging', icon: DollarSign, earned: false }
  ];

  const monthlyData = [
    { month: 'Jan', co2: 0.8, packages: 12 },
    { month: 'Feb', co2: 1.2, packages: 18 },
    { month: 'Mar', co2: 0.9, packages: 15 },
    { month: 'Apr', co2: 1.5, packages: 22 },
    { month: 'May', co2: 2.1, packages: 28 },
    { month: 'Jun', co2: 2.5, packages: 35 }
  ];

  const recentActivity = [
    { id: 1, action: 'Used eco-packaging for smartphone', points: 15, time: '2 hours ago' },
    { id: 2, action: 'Optimized laptop packaging', points: 20, time: '1 day ago' },
    { id: 3, action: 'Recycled packaging materials', points: 10, time: '2 days ago' },
    { id: 4, action: 'Completed eco-challenge', points: 25, time: '3 days ago' },
    { id: 5, action: 'Shared sustainability tips', points: 5, time: '1 week ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-eco-yellow to-yellow-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Impact Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your environmental impact, achievements, and eco-packaging journey.
          </p>
        </motion.div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-lg p-1 shadow-sm">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedPeriod === period
                    ? 'bg-eco-green text-white'
                    : 'text-gray-600 hover:text-eco-green'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
        >
          <div className="card text-center">
            <Cloud className="w-8 h-8 text-eco-green mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{impactData.co2Saved}kg</div>
            <div className="text-sm text-gray-600">CO₂ Saved</div>
          </div>
          <div className="card text-center">
            <Leaf className="w-8 h-8 text-eco-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{impactData.treesPlanted}</div>
            <div className="text-sm text-gray-600">Trees Planted</div>
          </div>
          <div className="card text-center">
            <Award className="w-8 h-8 text-eco-yellow mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{impactData.ecoPoints}</div>
            <div className="text-sm text-gray-600">Eco Points</div>
          </div>
          <div className="card text-center">
            <Package className="w-8 h-8 text-eco-orange mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{impactData.packagesOptimized}</div>
            <div className="text-sm text-gray-600">Packages Optimized</div>
          </div>
          <div className="card text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">${impactData.costSaved}</div>
            <div className="text-sm text-gray-600">Cost Saved</div>
          </div>
          <div className="card text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{impactData.successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-eco-green" />
              Monthly Progress
            </h2>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>CO₂ Saved: {data.co2}kg</span>
                      <span>Packages: {data.packages}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-eco-green to-eco-blue h-2 rounded-full"
                        style={{ width: `${(data.co2 / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-eco-green" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-eco-green">+{activity.points}</span>
                    <Award className="w-4 h-4 text-eco-yellow" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-eco-yellow" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  whileHover={{ y: -5 }}
                  className={`card text-center transition-all duration-300 ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-eco-green to-green-600 text-white' 
                      : 'bg-gray-100'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    achievement.earned ? 'bg-white bg-opacity-20' : 'bg-gray-200'
                  }`}>
                    <Icon className={`w-6 h-6 ${achievement.earned ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <h3 className={`font-semibold mb-2 ${achievement.earned ? 'text-white' : 'text-gray-900'}`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm ${achievement.earned ? 'text-green-100' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                  {achievement.earned && (
                    <div className="mt-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white bg-opacity-20 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Earned
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 
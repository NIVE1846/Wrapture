import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Award, 
  Star, 
  Target, 
  Trophy,
  CheckCircle,
  XCircle,
  RefreshCw,
  Zap,
  Leaf,
  Cloud,
  DollarSign
} from 'lucide-react';
import toast from 'react-hot-toast';

const Quests = () => {
  const [currentQuest, setCurrentQuest] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const quests = [
    {
      id: 1,
      title: 'Recycling Master',
      description: 'Sort packaging materials into the correct bins',
      difficulty: 'Easy',
      reward: 25,
      icon: Award,
      color: 'from-eco-green to-green-600'
    },
    {
      id: 2,
      title: 'Eco Challenge',
      description: 'Identify sustainable packaging materials',
      difficulty: 'Medium',
      reward: 50,
      icon: Star,
      color: 'from-eco-blue to-blue-600'
    },
    {
      id: 3,
      title: 'Carbon Warrior',
      description: 'Minimize carbon footprint in packaging choices',
      difficulty: 'Hard',
      reward: 100,
      icon: Target,
      color: 'from-eco-orange to-orange-600'
    }
  ];

  const gameItems = [
    { id: 1, name: 'Plastic Bottle', type: 'plastic', correctBin: 'recycling', image: '🥤' },
    { id: 2, name: 'Paper Box', type: 'paper', correctBin: 'recycling', image: '📦' },
    { id: 3, name: 'Glass Jar', type: 'glass', correctBin: 'recycling', image: '🥫' },
    { id: 4, name: 'Banana Peel', type: 'organic', correctBin: 'compost', image: '🍌' },
    { id: 5, name: 'Aluminum Can', type: 'metal', correctBin: 'recycling', image: '🥫' },
    { id: 6, name: 'Plastic Bag', type: 'plastic', correctBin: 'landfill', image: '🛍️' },
    { id: 7, name: 'Cardboard', type: 'paper', correctBin: 'recycling', image: '📄' },
    { id: 8, name: 'Styrofoam', type: 'plastic', correctBin: 'landfill', image: '🧱' }
  ];

  const [draggedItem, setDraggedItem] = useState(null);
  const [bins, setBins] = useState({
    recycling: [],
    compost: [],
    landfill: []
  });

  const startQuest = (questIndex) => {
    setCurrentQuest(questIndex);
    setIsPlaying(true);
    setGameCompleted(false);
    setScore(0);
    setBins({ recycling: [], compost: [], landfill: [] });
    toast.success(`Starting ${quests[questIndex].title}! 🎮`);
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (binType) => {
    if (!draggedItem) return;

    const isCorrect = draggedItem.correctBin === binType;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      toast.success('Correct! +10 points 🌱');
    } else {
      toast.error('Wrong bin! Try again ❌');
    }

    setBins(prev => ({
      ...prev,
      [binType]: [...prev[binType], draggedItem]
    }));

    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const completeQuest = () => {
    const quest = quests[currentQuest];
    const finalScore = score + (gameCompleted ? quest.reward : 0);
    
    setGameCompleted(true);
    toast.success(`Quest completed! Earned ${finalScore} points! 🎉`);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setGameCompleted(false);
    setScore(0);
    setBins({ recycling: [], compost: [], landfill: [] });
    setDraggedItem(null);
  };

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
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Eco Quests
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete challenges to earn eco points and learn about sustainable packaging!
          </p>
        </motion.div>

        {!isPlaying ? (
          /* Quest Selection */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {quests.map((quest, index) => {
              const Icon = quest.icon;
              return (
                <motion.div
                  key={quest.id}
                  whileHover={{ y: -5 }}
                  className="card cursor-pointer group"
                  onClick={() => startQuest(index)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${quest.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {quest.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {quest.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      quest.difficulty === 'Easy' ? 'bg-eco-green text-white' :
                      quest.difficulty === 'Medium' ? 'bg-eco-yellow text-white' :
                      'bg-eco-red text-white'
                    }`}>
                      {quest.difficulty}
                    </span>
                    <div className="flex items-center text-eco-yellow">
                      <Award className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{quest.reward}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* Game Interface */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Game Header */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {quests[currentQuest].title}
                  </h2>
                  <p className="text-gray-600">{quests[currentQuest].description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-eco-green">{score}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={resetGame}
                  className="btn-secondary flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </button>
                <button
                  onClick={completeQuest}
                  disabled={!gameCompleted}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Complete Quest
                </button>
              </div>
            </div>

            {/* Game Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Items to Sort */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Items to Sort</h3>
                <div className="grid grid-cols-2 gap-4">
                  {gameItems.map((item) => (
                    <motion.div
                      key={item.id}
                      draggable
                      onDragStart={() => handleDragStart(item)}
                      className="bg-gray-50 rounded-lg p-4 text-center cursor-move hover:bg-gray-100 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-3xl mb-2">{item.image}</div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bins */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sorting Bins</h3>
                <div className="space-y-4">
                  {[
                    { type: 'recycling', name: '♻️ Recycling', color: 'bg-blue-100 border-blue-300' },
                    { type: 'compost', name: '🌱 Compost', color: 'bg-green-100 border-green-300' },
                    { type: 'landfill', name: '🗑️ Landfill', color: 'bg-gray-100 border-gray-300' }
                  ].map((bin) => (
                    <div
                      key={bin.type}
                      onDrop={() => handleDrop(bin.type)}
                      onDragOver={handleDragOver}
                      className={`border-2 border-dashed rounded-lg p-4 min-h-24 ${bin.color} transition-colors duration-200 hover:bg-opacity-80`}
                    >
                      <div className="text-lg font-medium mb-2">{bin.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {bins[bin.type].map((item, index) => (
                          <div key={index} className="bg-white rounded-lg p-2 text-center">
                            <div className="text-xl">{item.image}</div>
                            <div className="text-xs">{item.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="card bg-gradient-to-r from-eco-green to-green-600 text-white">
              <h3 className="text-lg font-semibold mb-2">How to Play</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Drag items to the correct bins</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Earn points for correct sorting</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span>Learn about proper recycling</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-eco-yellow" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'First Quest', description: 'Complete your first quest', earned: true, icon: Star },
              { name: 'Perfect Score', description: 'Get 100% on any quest', earned: false, icon: Target },
              { name: 'Speed Demon', description: 'Complete quest in under 2 minutes', earned: false, icon: Zap },
              { name: 'Eco Master', description: 'Complete all quests', earned: false, icon: Leaf }
            ].map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
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

export default Quests; 
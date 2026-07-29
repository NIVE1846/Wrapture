import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TrashGPT = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hey there! I'm TrashGPT, your eco-friendly AI assistant! 🌱 Want to learn about sustainable packaging or get roasted for your recycling mistakes? 😄",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const ecoResponses = {
    greetings: [
      "Hey eco-warrior! 🌱 Ready to save the planet one package at a time?",
      "Welcome to the green side! 🌿 What can I teach you today?",
      "Hello there, future environmentalist! 🌍 Let's make Earth great again!"
    ],
    recycling: [
      "That's the spirit! ♻️ You're making Mother Nature proud!",
      "Excellent choice! 🌱 You're helping create a circular economy!",
      "Way to go! 🌿 Every small action counts towards a greener future!"
    ],
    mistakes: [
      "Oh no! 🙈 That's not quite right... Let me educate you on the proper way!",
      "Yikes! 😅 That's a common mistake. Here's what you should do instead:",
      "Not quite there yet! 🤔 Let me show you the eco-friendly way:"
    ],
    roasting: [
      "Bruh, that's like trying to recycle a pizza box covered in grease! 🤦‍♂️",
      "Oh honey, that's not recyclable - it's like putting a plastic bag in the paper bin! 😂",
      "That's the recycling equivalent of wearing socks with sandals! 🙈",
      "My AI circuits are short-circuiting from that answer! ⚡"
    ]
  };

  const getRandomResponse = (category) => {
    const responses = ecoResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let botResponse = '';

      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botResponse = getRandomResponse('greetings');
      } else if (lowerInput.includes('recycle') || lowerInput.includes('eco')) {
        botResponse = getRandomResponse('recycling');
      } else if (lowerInput.includes('plastic') || lowerInput.includes('paper')) {
        botResponse = getRandomResponse('mistakes') + " Always check your local recycling guidelines!";
      } else {
        botResponse = getRandomResponse('roasting') + " 🌱 But hey, we're all learning!";
      }

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-eco-green rounded-full shadow-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-200 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-eco-green rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">TrashGPT</h3>
                  <p className="text-xs text-gray-500">Eco AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.type === 'user' ? 'bg-eco-blue' : 'bg-eco-green'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-3 h-3 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-eco-blue text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about eco-packaging..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-3 py-2 bg-eco-green text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TrashGPT; 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
  Leaf,
  Package,
  Cloud,
  Award
} from 'lucide-react';
import toast from 'react-hot-toast';

const ReviewScanner = () => {
  const [reviewText, setReviewText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleReviews = [
    "Great product but the packaging was excessive. Too much plastic waste!",
    "Love the eco-friendly packaging! The recycled materials are perfect.",
    "Product arrived damaged due to poor packaging. Need better protection.",
    "Amazing sustainable packaging! The biodegradable materials are a game-changer.",
    "Good product but packaging could be more environmentally friendly."
  ];

  const analyzeReview = () => {
    if (!reviewText.trim()) {
      toast.error('Please enter a review to analyze!');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate NLP analysis
    setTimeout(() => {
      const lowerText = reviewText.toLowerCase();
      
      // Mock sentiment analysis
      let sentiment = 'neutral';
      let sentimentScore = 0;
      
      if (lowerText.includes('great') || lowerText.includes('love') || lowerText.includes('amazing')) {
        sentiment = 'positive';
        sentimentScore = 0.8;
      } else if (lowerText.includes('damaged') || lowerText.includes('poor') || lowerText.includes('excessive')) {
        sentiment = 'negative';
        sentimentScore = 0.3;
      }

      // Mock sustainability analysis
      const sustainabilityKeywords = {
        'eco-friendly': 1,
        'sustainable': 1,
        'recycled': 1,
        'biodegradable': 1,
        'plastic waste': -1,
        'excessive': -1,
        'environmental': 1,
        'green': 1
      };

      let sustainabilityScore = 0;
      let sustainabilityMentions = [];
      
      Object.entries(sustainabilityKeywords).forEach(([keyword, score]) => {
        if (lowerText.includes(keyword)) {
          sustainabilityScore += score;
          sustainabilityMentions.push(keyword);
        }
      });

      // Mock packaging complaints
      const packagingComplaints = [];
      if (lowerText.includes('damaged') || lowerText.includes('poor packaging')) {
        packagingComplaints.push('Product damage due to packaging');
      }
      if (lowerText.includes('excessive') || lowerText.includes('too much')) {
        packagingComplaints.push('Excessive packaging materials');
      }
      if (lowerText.includes('plastic waste')) {
        packagingComplaints.push('Environmental concerns about plastic');
      }

      const mockAnalysis = {
        sentiment: {
          type: sentiment,
          score: sentimentScore,
          description: sentiment === 'positive' ? 'Positive feedback' : 
                      sentiment === 'negative' ? 'Negative feedback' : 'Neutral feedback'
        },
        sustainability: {
          score: sustainabilityScore,
          mentions: sustainabilityMentions,
          level: sustainabilityScore > 0 ? 'High' : sustainabilityScore < 0 ? 'Low' : 'Medium'
        },
        packaging: {
          complaints: packagingComplaints,
          suggestions: [
            'Consider reducing packaging materials',
            'Use more eco-friendly materials',
            'Improve packaging protection',
            'Add recycling instructions'
          ]
        },
        insights: [
          'Customer values sustainability',
          'Packaging quality needs improvement',
          'Environmental awareness is high',
          'Consider eco-friendly alternatives'
        ]
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
      toast.success('Review analysis complete! 🧠');
    }, 2500);
  };

  const loadSampleReview = (review) => {
    setReviewText(review);
    setAnalysis(null);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-eco-green';
      case 'negative': return 'text-eco-red';
      default: return 'text-eco-yellow';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-5 h-5 text-eco-green" />;
      case 'negative': return <TrendingDown className="w-5 h-5 text-eco-red" />;
      default: return <AlertTriangle className="w-5 h-5 text-eco-yellow" />;
    }
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
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Review Scanner
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze customer reviews for sustainability insights and packaging feedback using AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Review Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-pink-500" />
                Review Analysis
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Review
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Paste a customer review here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                    rows={6}
                  />
                </div>

                <button
                  onClick={analyzeReview}
                  disabled={!reviewText.trim() || isAnalyzing}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Analyze Review
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Reviews</h3>
              <div className="space-y-3">
                {sampleReviews.map((review, index) => (
                  <button
                    key={index}
                    onClick={() => loadSampleReview(review)}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm"
                  >
                    "{review}"
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-2 text-pink-500" />
              AI Analysis Results
            </h2>

            {!analysis ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">
                  Enter a review and analyze it to see AI-powered insights.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Sentiment Analysis */}
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    {getSentimentIcon(analysis.sentiment.type)}
                    <span className="ml-2">Sentiment Analysis</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-pink-100">Sentiment</div>
                      <div className="font-semibold capitalize">{analysis.sentiment.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-pink-100">Score</div>
                      <div className="font-semibold">{(analysis.sentiment.score * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                  <p className="text-pink-100 text-sm mt-2">{analysis.sentiment.description}</p>
                </div>

                {/* Sustainability Analysis */}
                <div className="bg-gradient-to-r from-eco-green to-green-600 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Leaf className="w-5 h-5 mr-2" />
                    Sustainability Analysis
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-green-100">Sustainability Level</div>
                      <div className="font-semibold">{analysis.sustainability.level}</div>
                    </div>
                    <div>
                      <div className="text-sm text-green-100">Mentions</div>
                      <div className="font-semibold">{analysis.sustainability.mentions.length}</div>
                    </div>
                  </div>
                  {analysis.sustainability.mentions.length > 0 && (
                    <div className="mt-3">
                      <div className="text-sm text-green-100 mb-2">Keywords Found:</div>
                      <div className="flex flex-wrap gap-2">
                        {analysis.sustainability.mentions.map((mention, index) => (
                          <span key={index} className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">
                            {mention}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Packaging Feedback */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-eco-orange" />
                    Packaging Feedback
                  </h3>
                  
                  {analysis.packaging.complaints.length > 0 ? (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700">Complaints:</h4>
                      {analysis.packaging.complaints.map((complaint, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <XCircle className="w-4 h-4 text-eco-red mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{complaint}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-eco-green">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">No packaging complaints found</span>
                    </div>
                  )}

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Suggestions:</h4>
                    <div className="space-y-2">
                      {analysis.packaging.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-eco-green rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Insights */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-eco-yellow" />
                    Key Insights
                  </h3>
                  <div className="space-y-2">
                    {analysis.insights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-eco-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Items */}
                <div className="bg-gradient-to-r from-eco-blue to-blue-600 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Recommended Actions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">Address packaging complaints</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Leaf className="w-4 h-4" />
                      <span className="text-sm">Enhance sustainability messaging</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Cloud className="w-4 h-4" />
                      <span className="text-sm">Improve eco-friendly packaging</span>
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

export default ReviewScanner; 
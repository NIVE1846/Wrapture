# 🌱 Wrapture - AI-Powered Eco-Packaging System

A comprehensive React-based web application that demonstrates an AI-powered eco-packaging recommendation system. Built with modern web technologies and featuring multiple AI/ML simulation modules.

## 🚀 Features

### Core Modules

#### 1. **Product-ID Mode** 📦
- Select products from a database
- AI-powered packaging recommendations
- Carbon footprint analysis
- Cost and eco-points calculation

#### 2. **Vision-Based Mode** 📸
- Upload product images
- AI analysis of dimensions, shape, and materials
- Editable detection results
- Instant packaging recommendations

#### 3. **Impact Dashboard** 📊
- Environmental impact tracking
- Monthly progress visualization
- Achievement system
- Recent activity feed

#### 4. **3D Packaging Simulator** 🎮
- Interactive 3D packaging visualization
- Multiple packaging types (box, sphere, cylinder)
- Environmental stats comparison
- Real-time 3D rotation and zoom

#### 5. **Smart Label Scanner** 🔍
- OCR simulation for product labels
- Material recyclability analysis
- Component breakdown
- Eco recommendations

#### 6. **Eco Quests** 🏆
- Gamified recycling challenges
- Drag-and-drop sorting games
- Achievement system
- Educational content

#### 7. **Review Scanner** 🧠
- NLP-powered review analysis
- Sentiment analysis
- Sustainability keyword detection
- Packaging feedback insights

#### 8. **TrashGPT Chatbot** 💬
- Floating AI assistant
- Eco-education and roasting
- Real-time chat interface
- Contextual responses

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **UI Components**: Lucide React Icons
- **File Upload**: React Dropzone
- **Notifications**: React Hot Toast
- **Maps**: Leaflet (ready for integration)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wrapture
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Getting Started
1. Visit the homepage to see all available modules
2. Choose between Product-ID or Vision-Based modes
3. Explore the 3D simulator for packaging visualization
4. Try the gamified quests for learning
5. Use TrashGPT for eco-education

### Key Features Demo

#### Product Mode
- Select a product from the dropdown
- Click "Generate AI Recommendation"
- View packaging suggestions with environmental impact

#### Vision Mode
- Upload a product image
- Click "Analyze with AI"
- Edit detected information if needed
- Get instant packaging recommendations

#### 3D Simulator
- Switch between different packaging types
- Rotate and zoom the 3D models
- Compare environmental stats
- Visualize packaging options

#### Quests
- Choose a quest difficulty
- Drag items to correct recycling bins
- Earn points and achievements
- Learn about proper recycling

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, eco-friendly color scheme
- **Smooth Animations**: Framer Motion powered transitions
- **Interactive Elements**: Hover effects and micro-interactions
- **Accessibility**: Keyboard navigation and screen reader support

## 🔧 Customization

### Adding New Products
Edit the `products` array in `src/pages/ProductMode.js`:
```javascript
const products = [
  { id: 'PROD009', name: 'New Product', fragility: 'Medium', size: 'Large', weight: '1kg', type: 'Category' }
];
```

### Modifying AI Responses
Update the response logic in `src/components/TrashGPT.js`:
```javascript
const ecoResponses = {
  newCategory: [
    "Your custom response here!",
    "Another response option"
  ]
};
```

### Adding New Quests
Edit the `quests` array in `src/pages/Quests.js`:
```javascript
const quests = [
  {
    id: 4,
    title: 'New Quest',
    description: 'Quest description',
    difficulty: 'Medium',
    reward: 75,
    icon: Star,
    color: 'from-purple-500 to-purple-600'
  }
];
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 📱 Mobile Support

The application is fully responsive and optimized for:
- iOS Safari
- Android Chrome
- Tablet devices
- Touch interactions

## 🔮 Future Enhancements

- **Real AI Integration**: Connect to actual ML models
- **Backend API**: Flask/FastAPI integration
- **Database**: User progress and achievements
- **Maps Integration**: Real recycling center locations
- **Advanced 3D**: More complex packaging models
- **Multi-language**: Internationalization support
- **PWA**: Progressive Web App features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Three.js** for 3D graphics
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for a greener planet** 🌍 
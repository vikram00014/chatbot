# NEXUS AI Chatbot 🤖

A beautiful and modern AI chatbot powered by Google Gemini API with a stunning pink and blue theme.

![NEXUS AI](https://img.shields.io/badge/NEXUS-AI-ff6b9d?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

## ✨ Features

- 🎨 **Beautiful UI** - Modern pink and blue gradient theme
- 💬 **Real-time Chat** - Instant responses from Google Gemini AI
- 📝 **Markdown Support** - Formatted responses with code highlighting
- 💻 **Code Blocks** - Syntax highlighting for multiple languages
- 📋 **Copy Code** - One-click copy for code snippets
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎭 **Smooth Animations** - Floating bubbles and smooth transitions
- 🕐 **Message Timestamps** - Track conversation timeline
- 🔢 **Character Counter** - 2000 character limit with live counter
- 💡 **Quick Suggestions** - Pre-built prompts to get started

## 🚀 Demo

Simply open `index.html` in your browser to see the chatbot in action!

**Live Demo:** [Deploy on Vercel](https://vercel.com) - See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Click the button below or follow the [detailed guide](DEPLOYMENT.md)

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vikram00014/chatbot)

2. Add environment variable: `GEMINI_API_KEY`
3. Deploy!

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vikram00014/chatbot.git
   cd chatbot
   ```

2. **Set up your API key**
   - Copy `config.example.js` to `config.js`
   ```bash
   cp config.example.js config.js
   ```
   - Open `config.js` and replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key

3. **Open the chatbot**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

## 📁 Project Structure

```
chatbot/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Core chatbot functionality
├── config.js           # API configuration (gitignored)
├── config.example.js   # Example config file
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
    --secondary-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    /* Add more customizations */
}
```

### Changing AI Model

Edit the API URL in `script.js`:

```javascript
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;
```

Replace `gemini-3-flash-preview` with other available models like `gemini-pro`.

## 🔐 Security Notes

- **Never commit your API key** - The `config.js` file is gitignored
- For production use, implement a backend server to handle API calls
- Consider rate limiting and usage monitoring

## 🌟 Features Breakdown

### User Interface
- Full-screen responsive design
- Pink and blue gradient theme
- Smooth animations and transitions
- Custom scrollbar styling
- Message avatars with gradients
- Floating bubble background effect

### Functionality
- Conversation history tracking
- Real-time typing indicators
- Character count validation
- Clear chat functionality
- Suggestion chips for quick prompts
- Markdown rendering
- Code syntax highlighting
- Copy code button for snippets

## 📝 Usage Tips

1. **Start with suggestions** - Click on any suggestion chip to begin
2. **Format your queries** - Ask specific questions for better responses
3. **Code requests** - The AI can generate and explain code
4. **Conversation context** - The bot remembers your conversation history
5. **Clear chat** - Use the trash icon to start fresh

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Repository**: [github.com/vikram00014/chatbot](https://github.com/vikram00014/chatbot)
- **Google Gemini API**: [makersuite.google.com](https://makersuite.google.com/)
- **Issues**: [Report a bug](https://github.com/vikram00014/chatbot/issues)

## 👨‍💻 Author

**Vikram**
- GitHub: [@vikram00014](https://github.com/vikram00014)

## 🙏 Acknowledgments

- Google Gemini for the AI API
- Font Awesome for icons
- Marked.js for markdown parsing
- Highlight.js for code syntax highlighting

---

⭐ If you find this project useful, please consider giving it a star on GitHub!

**Made with ❤️ by Vikram**

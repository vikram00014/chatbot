# Vercel Deployment Guide 🚀

This guide will walk you through deploying NEXUS AI Chatbot on Vercel with a secure backend.

## 📋 Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free)
2. [Vercel CLI](https://vercel.com/docs/cli) (optional, for CLI deployment)
3. Your Google Gemini API key

## 🌐 Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub (Already Done ✅)
Your code is already on GitHub at: https://github.com/vikram00014/chatbot

### Step 2: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `vikram00014/chatbot`
4. Vercel will auto-detect it as a static site

### Step 3: Configure for Vercel Deployment

**Before deploying, update your local files:**

1. **Rename the script file in index.html:**
   - Change `<script src="script.js"></script>` to `<script src="script-vercel.js"></script>`
   - Remove `<script src="config.js"></script>` (not needed with serverless backend)

2. **Commit and push changes:**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment with serverless functions"
   git push origin main
   ```

### Step 4: Add Environment Variable

1. In Vercel project settings, go to **"Settings"** → **"Environment Variables"**
2. Add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key (AIzaSyDMDy2MwoYyVKOF71Gzj_HYS21VES8qJpY)
   - **Environment:** Production, Preview, Development

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (usually 1-2 minutes)
3. Your chatbot will be live at: `https://your-project-name.vercel.app`

## 💻 Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Update for Vercel (Same as Method 1, Step 3)

Update index.html to use `script-vercel.js` and push changes.

### Step 4: Deploy

```bash
cd C:\Users\Vikram\Desktop\openai
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your Vercel account
- **Link to existing project?** No
- **Project name?** chatbot (or your choice)
- **Directory?** ./
- **Override settings?** No

### Step 5: Add Environment Variable

```bash
vercel env add GEMINI_API_KEY
```

Enter your API key when prompted.

### Step 6: Redeploy with Environment Variable

```bash
vercel --prod
```

## 🔧 Project Structure for Vercel

```
chatbot/
├── api/
│   └── chat.js              # Serverless function (handles API calls)
├── index.html               # Main HTML (using script-vercel.js)
├── styles.css               # Styling
├── script-vercel.js         # Frontend logic (calls /api/chat)
├── vercel.json             # Vercel configuration
├── .env.example            # Environment variable template
├── .gitignore              # Git ignore (includes .env)
└── README.md               # Documentation
```

## 🔐 Security Benefits

With Vercel deployment:
- ✅ **API key hidden** - Stored in environment variables, never exposed to client
- ✅ **Serverless backend** - `/api/chat` endpoint handles all API calls
- ✅ **CORS configured** - Secure cross-origin requests
- ✅ **No config.js needed** - Frontend only calls your own API

## 🧪 Testing Your Deployment

1. Visit your Vercel URL
2. Open browser DevTools → Network tab
3. Send a message
4. Verify requests go to `/api/chat` (not directly to Google)
5. Your API key should NOT appear in network requests

## 🐛 Troubleshooting

### Error: "API key not configured"
- Ensure environment variable `GEMINI_API_KEY` is set in Vercel
- Redeploy after adding environment variable

### Error: "CORS error"
- The serverless function has CORS headers configured
- Try clearing browser cache

### Changes not reflecting?
- Vercel auto-deploys on GitHub push
- Check deployment status in Vercel dashboard
- Force redeploy if needed

## 📊 Monitoring

- **Analytics:** Vercel provides free analytics
- **Logs:** View function logs in Vercel dashboard → Deployments → Function Logs
- **Performance:** Check response times and errors

## 🎉 You're Done!

Your chatbot is now:
- ✅ Deployed on Vercel
- ✅ API key secure in backend
- ✅ Auto-deploys on git push
- ✅ Has serverless API endpoints
- ✅ Scalable and production-ready

**Live URL:** Check your Vercel dashboard for the deployment URL!

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)

---

Need help? Open an issue on GitHub!

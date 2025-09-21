# 🚀 Deploy Your AI Learning Platform for FREE

## Quick Overview
We'll use **Vercel** (hosting) + **Supabase** (database) - both have generous free tiers!

---

## 📋 **Step 1: Prepare Your Code**

### 1.1 Create Local Environment File
Create `.env.local` in your project root:
```bash
# Development Environment
DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-local-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 1.2 Test Local Build
```bash
npm run build
```

---

## 🗄️ **Step 2: Set Up Free Database (Supabase)**

### 2.1 Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub (free)
3. Click "New Project"
4. Choose a name: `ai-learning-platform`
5. Generate a strong password
6. Select region closest to you
7. Click "Create new project"

### 2.2 Get Database URL
1. Go to Settings → Database
2. Copy the "Connection string" (starts with `postgresql://`)
3. Replace `[YOUR-PASSWORD]` with your actual password

---

## 📁 **Step 3: Push to GitHub**

### 3.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 3.2 Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name: `ai-learning-platform`
4. Make it **Public** (required for free Vercel)
5. Click "Create repository"

### 3.3 Push Your Code
```bash
git remote add origin https://github.com/YOUR-USERNAME/ai-learning-platform.git
git branch -M main
git push -u origin main
```

---

## 🌐 **Step 4: Deploy to Vercel**

### 4.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with **GitHub** (free)
3. Click "Import Project"
4. Select your `ai-learning-platform` repository
5. Click "Import"

### 4.2 Configure Environment Variables
Before deploying, add these environment variables in Vercel:

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```
DATABASE_PROVIDER = postgresql
DATABASE_URL = [your-supabase-connection-string]
NEXTAUTH_SECRET = [generate-random-32-character-string]
NEXTAUTH_URL = https://your-app-name.vercel.app
```

### 4.3 Deploy
1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Your app will be live at `https://your-app-name.vercel.app`

---

## 🗃️ **Step 5: Set Up Database Tables**

### 5.1 Run Database Migrations
After deployment, you need to create the database tables:

1. Go to your Vercel project dashboard
2. Click on "Functions" tab
3. Or use Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
vercel login
vercel link

# Run database push
vercel env pull .env.local
npx prisma db push
```

---

## ✅ **Step 6: Test Your Live App**

1. Visit your live URL: `https://your-app-name.vercel.app`
2. Try creating an account
3. Navigate to courses
4. Test the progress bar functionality

---

## 🎉 **You're Live!**

### Free Tier Limits:
- **Vercel**: 100GB bandwidth/month, unlimited deployments
- **Supabase**: 500MB database, 50MB file storage
- **Total Cost**: $0/month

### Custom Domain (Optional):
1. Buy a domain or use a free one from [Freenom](https://freenom.com)
2. In Vercel, go to Settings → Domains
3. Add your custom domain

---

## 🔧 **Troubleshooting**

### Build Fails?
- Check the build logs in Vercel
- Ensure all environment variables are set
- Make sure your GitHub repo is public

### Database Connection Issues?
- Verify your Supabase connection string
- Check that `DATABASE_PROVIDER` is set to `postgresql`
- Ensure you've run `prisma db push`

### Authentication Not Working?
- Verify `NEXTAUTH_URL` matches your live domain
- Check `NEXTAUTH_SECRET` is set and strong

---

**Need help?** The deployment should take about 15-20 minutes total!

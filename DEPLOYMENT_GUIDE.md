# Railway Deployment Guide - Step by Step

This guide will help you deploy both the **Backend (Server)** and **Frontend (EcoTrade)** to Railway.

## Prerequisites
- Railway account (sign up at https://railway.app)
- GitHub repository already connected (you've done this ✅)
- MongoDB database (MongoDB Atlas recommended - free tier available)
- Environment variables ready

---

## 🎯 Overview

You'll create **TWO separate services** on Railway:
1. **Backend Service** - Node.js server (runs from `server/` folder)
2. **Frontend Service** - React app (runs from `ecotrade/` folder)

---

## 📋 Step 1: Create MongoDB Database (If you don't have one)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up/Login
3. Create a free cluster (M0)
4. Click "Connect" → Choose "Connect your application"
5. Copy the connection string (you'll need this for `MONGODB_URI`)
6. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Username: `admin` (or your choice)
   - Password: Create a strong password (SAVE IT!)
   - Role: "Atlas Admin"

---

## 🔧 Step 2: Set Up Backend Service on Railway

### 2.1 Create Backend Service

1. Go to https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository: `Aniketh077/eco_reeown`
5. Railway will detect your repo and ask what to deploy
6. Click **"Add Service"** → Select **"Empty Service"** (we'll configure it)
7. Name it: `eco-reeown-backend` (or any name you prefer)

### 2.2 Configure Backend Service

1. Click on your newly created service
2. Go to **"Settings"** tab
3. Scroll to **"Root Directory"**
   - Set Root Directory: `server`
4. Scroll to **"Build Command"** (leave empty - Railway will auto-detect)
5. Scroll to **"Start Command"**
   - Set Start Command: `npm start`
6. Go to **"Variables"** tab → Add these environment variables:

```
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/eco_reeown?retryWrites=true&w=majority

# JWT Secret (generate a random string - very important!)
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters-long

# Frontend URL (you'll get this after deploying frontend)
FRONTEND_URL=https://your-frontend-service.railway.app

# Admin Credentials
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-admin-password

# Razorpay (Payment Gateway)
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# AWS S3 (For file uploads) - Optional but recommended
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=your-aws-region
AWS_CLOUDFRONT_DOMAIN=your-cloudfront-domain

# Email Service (Gmail API)
GMAIL_CLIENT_ID=your-gmail-client-id
GMAIL_CLIENT_SECRET=your-gmail-client-secret
GMAIL_REDIRECT_URI=https://developers.google.com/oauthplayground
GMAIL_REFRESH_TOKEN=your-gmail-refresh-token
GMAIL_USER=your-email@gmail.com
APP_NAME=EcoReeown

# Support Contact (Optional)
SUPPORT_EMAIL=support@yourdomain.com
SUPPORT_PHONE=+1-800-000-0000
```

### 2.3 Generate JWT Secret (Important!)

Run this in your terminal to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

### 2.4 Deploy Backend

1. Go to **"Deployments"** tab
2. Railway will automatically start deploying
3. Wait for deployment to complete (green checkmark ✅)
4. Go to **"Settings"** → **"Networking"**
5. Click **"Generate Domain"** to get your backend URL
6. Copy the URL (e.g., `https://eco-reeown-backend-production.up.railway.app`)

---

## 🎨 Step 3: Set Up Frontend Service on Railway

### 3.1 Create Frontend Service

1. In the same Railway project, click **"New"** → **"Service"**
2. Select **"GitHub Repo"**
3. Choose the same repository: `Aniketh077/eco_reeown`
4. Railway will add another service

### 3.2 Configure Frontend Service

1. Click on the new service (it will be named something like `eco_reeown`)
2. Go to **"Settings"** tab
3. Scroll to **"Root Directory"**
   - Set Root Directory: `ecotrade`
4. Scroll to **"Build Command"**
   - Set Build Command: `npm install && npm run build`
5. Scroll to **"Start Command"**
   - Set Start Command: `npm start`
6. Go to **"Variables"** tab → Add this environment variable:

```
VITE_BACKEND_URL=https://your-backend-url.railway.app
```

⚠️ **Important**: Replace `your-backend-url.railway.app` with the actual backend URL you got in Step 2.4!

### 3.3 Deploy Frontend

1. Go to **"Deployments"** tab
2. Railway will automatically start building and deploying
3. Wait for deployment to complete (this takes longer as it builds React)
4. Go to **"Settings"** → **"Networking"**
5. Click **"Generate Domain"** to get your frontend URL
6. Copy the URL (e.g., `https://eco-reeown-frontend-production.up.railway.app`)

---

## 🔄 Step 4: Update Environment Variables

After getting both URLs:

1. **Update Backend `FRONTEND_URL`**:
   - Go to Backend Service → **"Variables"**
   - Update `FRONTEND_URL` with your frontend URL
   - Railway will auto-redeploy

2. **Update Frontend `VITE_BACKEND_URL`** (if needed):
   - Go to Frontend Service → **"Variables"**
   - Update `VITE_BACKEND_URL` with your backend URL
   - Railway will auto-redeploy

---

## ✅ Step 5: Test Your Deployment

### Test Backend:
1. Visit: `https://your-backend-url.railway.app/api/health` (or `/api/`)
2. You should see a JSON response

### Test Frontend:
1. Visit your frontend URL
2. The React app should load
3. Try to login/register (check browser console for errors)

### Common Issues:
- **CORS errors**: Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- **API not connecting**: Check `VITE_BACKEND_URL` in frontend is correct
- **Database errors**: Verify `MONGODB_URI` is correct and database user has proper permissions
- **500 errors**: Check Railway logs (click on service → "Deployments" → Click on latest deployment → "View Logs")

---

## 📊 Step 6: Monitor Your Services

1. **View Logs**: 
   - Click on any service → **"Deployments"** → Click latest deployment → **"View Logs"**

2. **Check Status**:
   - Green checkmark = Running ✅
   - Yellow = Building/Deploying
   - Red = Error ❌

3. **Metrics**:
   - Go to service → **"Metrics"** tab to see CPU, Memory usage

---

## 🔐 Step 7: Environment Variables Checklist

Make sure you have these set (minimum required):

### Backend (Required):
- ✅ `NODE_ENV=production`
- ✅ `MONGODB_URI` (your MongoDB connection string)
- ✅ `JWT_SECRET` (random 32+ character string)
- ✅ `FRONTEND_URL` (your frontend Railway URL)
- ✅ `ADMIN_EMAIL` (admin login email)
- ✅ `ADMIN_PASSWORD` (admin password)

### Backend (Optional but Recommended):
- `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET` (for payments)
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` (for file uploads)
- `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, etc. (for emails)

### Frontend (Required):
- ✅ `VITE_BACKEND_URL` (your backend Railway URL)

---

## 🚀 Quick Deploy Summary

1. Create MongoDB Atlas database → Get connection string
2. Create Backend service → Set root: `server` → Add env vars → Deploy → Get URL
3. Create Frontend service → Set root: `ecotrade` → Add env vars → Deploy → Get URL
4. Update `FRONTEND_URL` in backend with frontend URL
5. Test both services

---

## 📝 Notes

- Railway free tier: 500 hours/month, $5 credit
- Both services will auto-deploy on every git push
- Environment variables are encrypted and secure
- You can add custom domains later in Settings → Networking
- Database connection string format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

---

## 🆘 Need Help?

1. Check Railway logs for errors
2. Verify all environment variables are set correctly
3. Test backend API endpoints directly (use Postman or curl)
4. Check browser console for frontend errors
5. Railway Docs: https://docs.railway.app

Good luck with your deployment! 🎉


# Railway Deployment Checklist ✅

Use this checklist to ensure you don't miss any steps during deployment.

## 📋 Pre-Deployment

- [ ] Have Railway account (https://railway.app)
- [ ] Have MongoDB Atlas account (https://mongodb.com/cloud/atlas)
- [ ] MongoDB database created and user set up
- [ ] MongoDB connection string ready
- [ ] Razorpay account (if using payments)
- [ ] AWS account (if using S3 for file uploads)
- [ ] Gmail API credentials (if using email)

---

## 🔧 Step 1: MongoDB Setup

- [ ] Created MongoDB Atlas account
- [ ] Created free cluster (M0)
- [ ] Created database user (username + password)
- [ ] Whitelisted IP (0.0.0.0/0 for Railway)
- [ ] Got connection string
- [ ] Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

---

## 🖥️ Step 2: Backend Service Setup

- [ ] Created new Railway project
- [ ] Connected GitHub repository (`Aniketh077/eco_reeown`)
- [ ] Created backend service
- [ ] Set Root Directory: `server`
- [ ] Set Start Command: `npm start`
- [ ] Generated JWT_SECRET (32+ characters)
- [ ] Added all required environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`
  - [ ] `MONGODB_URI` (from Step 1)
  - [ ] `JWT_SECRET` (generated)
  - [ ] `FRONTEND_URL` (will update after Step 3)
  - [ ] `ADMIN_EMAIL`
  - [ ] `ADMIN_PASSWORD`
  - [ ] `RAZORPAY_KEY_ID` (if using)
  - [ ] `RAZORPAY_KEY_SECRET` (if using)
  - [ ] AWS variables (if using)
  - [ ] Gmail variables (if using)
- [ ] Deployed backend service
- [ ] Got backend URL (e.g., `https://xxx.railway.app`)
- [ ] Tested backend health: `https://your-backend-url.railway.app/api/health`

---

## 🎨 Step 3: Frontend Service Setup

- [ ] Created frontend service (in same Railway project)
- [ ] Set Root Directory: `ecotrade`
- [ ] Set Build Command: `npm install && npm run build`
- [ ] Set Start Command: `npm start`
- [ ] Added environment variable:
  - [ ] `VITE_BACKEND_URL` (backend URL from Step 2)
- [ ] Deployed frontend service
- [ ] Got frontend URL (e.g., `https://yyy.railway.app`)
- [ ] Frontend loads successfully

---

## 🔄 Step 4: Update Configuration

- [ ] Updated backend `FRONTEND_URL` with frontend URL
- [ ] Verified backend auto-redeployed
- [ ] Tested CORS (frontend can call backend API)

---

## ✅ Step 5: Testing

### Backend Tests:
- [ ] Health check works: `/api/health`
- [ ] API root works: `/`
- [ ] No errors in Railway logs
- [ ] Database connection successful (check logs)

### Frontend Tests:
- [ ] Frontend loads in browser
- [ ] No console errors
- [ ] Can make API calls to backend
- [ ] Login/Register works (if implemented)
- [ ] Pages load correctly

---

## 🔍 Troubleshooting

If something doesn't work:

- [ ] Check Railway logs (Service → Deployments → View Logs)
- [ ] Verify all environment variables are set correctly
- [ ] Check CORS configuration (FRONTEND_URL matches exactly)
- [ ] Verify MongoDB connection string is correct
- [ ] Test backend API directly (Postman/curl)
- [ ] Check browser console for frontend errors
- [ ] Verify URLs don't have trailing slashes

---

## 📝 Notes

Write down your URLs here:

- **Backend URL**: `_________________________________`
- **Frontend URL**: `_________________________________`
- **MongoDB URI**: `_________________________________`
- **JWT Secret**: `_________________________________` (keep secret!)

---

## 🎉 Deployment Complete!

Once all items are checked:
- [ ] Both services are running (green ✅)
- [ ] All tests pass
- [ ] Application is accessible
- [ ] Share your deployed URLs!


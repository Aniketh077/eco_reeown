# Step-by-Step Railway Deployment Guide

## 🎯 Goal: Deploy Backend + Frontend to Railway

---

## STEP 1: Set Up MongoDB Database (5 minutes)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** or **"Sign In"**
3. Complete registration

### 1.2 Create Database Cluster
1. After login, click **"Build a Database"**
2. Choose **FREE** (M0) tier
3. Select a cloud provider (AWS recommended)
4. Select a region closest to you
5. Click **"Create"**
6. Wait 1-3 minutes for cluster to be created

### 1.3 Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `admin` (or your choice)
5. Password: Click **"Autogenerate Secure Password"** OR create your own (SAVE IT!)
6. Database User Privileges: **"Atlas Admin"**
7. Click **"Add User"**

### 1.4 Configure Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Railway deployment)
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string
6. **IMPORTANT**: Replace `<password>` with your database user password
7. Replace `<dbname>` with your database name (e.g., `eco_reeown`)
8. **SAVE THIS STRING** - You'll use it as `MONGODB_URI`

**Example:**
```
mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/eco_reeown?retryWrites=true&w=majority
```

---

## STEP 2: Create Railway Project (2 minutes)

### 2.1 Sign Up/Login to Railway
1. Go to https://railway.app
2. Click **"Login"** → **"Login with GitHub"**
3. Authorize Railway to access your GitHub account

### 2.2 Create New Project
1. In Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. You'll see your repositories - find **"eco_reeown"**
4. Click on **"eco_reeown"**
5. Railway will create a project and detect your code

---

## STEP 3: Deploy Backend Service (10 minutes)

### 3.1 Configure Backend Service
After Railway imports your repo, you'll see a service created. Let's configure it:

1. Click on the service (it might be named "eco_reeown" or similar)
2. Click **"Settings"** tab (gear icon)
3. Scroll down to find these settings:

#### Root Directory:
- Find **"Root Directory"**
- Click to edit
- Enter: `server`
- Click **"Update"**

#### Start Command:
- Find **"Start Command"**
- Enter: `npm start`
- Click **"Update"**

### 3.2 Add Environment Variables
1. Click **"Variables"** tab in the service
2. Click **"+ New Variable"** for each variable below

**Copy and paste these one by one:**

```bash
NODE_ENV
production
```

```bash
PORT
5000
```

```bash
MONGODB_URI
[Paste your MongoDB connection string from Step 1.5]
```

```bash
JWT_SECRET
[Generate this - see below]
```

```bash
FRONTEND_URL
https://placeholder.com
```
*(We'll update this after deploying frontend)*

```bash
ADMIN_EMAIL
admin@yourdomain.com
```
*(Use your email or any email)*

```bash
ADMIN_PASSWORD
YourSecurePassword123!
```
*(Create a strong password - save it!)*

#### Generate JWT_SECRET:
Open a terminal on your computer and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste it as `JWT_SECRET` value.

### 3.3 Deploy Backend
1. Click **"Deployments"** tab
2. Railway will automatically start deploying
3. Wait for deployment to complete (you'll see a green checkmark ✅)
4. This may take 2-5 minutes

### 3.4 Get Backend URL
1. Click **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://eco-reeown-backend-production.up.railway.app`)
5. **SAVE THIS URL** - You'll need it for frontend configuration

### 3.5 Test Backend
1. Open the backend URL in a new browser tab
2. Add `/api/health` at the end
3. You should see JSON response like:
```json
{
  "status": "OK",
  "message": "Server is running",
  ...
}
```

✅ **Backend is deployed!**

---

## STEP 4: Deploy Frontend Service (10 minutes)

### 4.1 Create Frontend Service
1. In your Railway project, click **"+ New"** button (top right)
2. Select **"GitHub Repo"**
3. Select **"eco_reeown"** repository
4. Railway will create a new service

### 4.2 Configure Frontend Service
1. Click on the newly created service
2. Click **"Settings"** tab

#### Root Directory:
- Find **"Root Directory"**
- Enter: `ecotrade`
- Click **"Update"**

#### Build Command:
- Find **"Build Command"**
- Enter: `npm install && npm run build`
- Click **"Update"**

#### Start Command:
- Find **"Start Command"**
- Enter: `npm start`
- Click **"Update"**

### 4.3 Add Frontend Environment Variable
1. Click **"Variables"** tab
2. Click **"+ New Variable"**

```bash
VITE_BACKEND_URL
[Paste your backend URL from Step 3.4]
```
*(Example: `https://eco-reeown-backend-production.up.railway.app`)*

**Important**: 
- Do NOT add `/api` at the end
- Do NOT add trailing slash `/`
- Just the base URL

### 4.4 Deploy Frontend
1. Click **"Deployments"** tab
2. Railway will start building (this takes longer - 5-10 minutes)
3. Wait for green checkmark ✅

### 4.5 Get Frontend URL
1. Click **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://eco-reeown-frontend-production.up.railway.app`)
5. **SAVE THIS URL**

### 4.6 Test Frontend
1. Open the frontend URL in a browser
2. Your React app should load
3. Check browser console (F12) for any errors

✅ **Frontend is deployed!**

---

## STEP 5: Connect Frontend and Backend (2 minutes)

### 5.1 Update Backend with Frontend URL
1. Go back to your **Backend Service**
2. Click **"Variables"** tab
3. Find `FRONTEND_URL` variable
4. Click the edit/pencil icon
5. Update the value to your **Frontend URL** from Step 4.5
6. Save

Railway will automatically redeploy the backend.

### 5.2 Verify Connection
1. Wait for backend redeployment (green checkmark)
2. Open your frontend URL
3. Try to use the app (login, browse products, etc.)
4. Check browser console (F12) - there should be no CORS errors

---

## STEP 6: Final Testing (5 minutes)

### Test Checklist:
- [ ] Backend health check works: `https://your-backend.railway.app/api/health`
- [ ] Frontend loads in browser
- [ ] No console errors in browser
- [ ] Can navigate between pages
- [ ] API calls work (check Network tab in browser DevTools)

### Common Issues & Solutions:

**❌ CORS Error:**
- Make sure `FRONTEND_URL` in backend matches frontend URL exactly
- No trailing slashes
- Include `https://`

**❌ API Connection Error:**
- Check `VITE_BACKEND_URL` in frontend is correct
- Make sure it's the backend URL (not frontend)
- No `/api` suffix

**❌ 500 Server Error:**
- Check Railway logs: Service → Deployments → View Logs
- Verify all environment variables are set
- Check MongoDB connection string is correct

**❌ Database Connection Error:**
- Verify MongoDB connection string format
- Check database user password is correct
- Verify Network Access allows Railway IPs (0.0.0.0/0)

---

## ✅ You're Done!

Your application is now live on Railway! 🎉

### Your URLs:
- **Backend**: `https://your-backend.railway.app`
- **Frontend**: `https://your-frontend.railway.app`

### Next Steps:
1. Test all features of your application
2. Set up custom domain (optional - in Settings → Networking)
3. Monitor usage in Railway dashboard
4. Set up alerts for errors

### Future Updates:
- Just push to GitHub: `git push origin main`
- Railway will auto-deploy both services
- No manual deployment needed!

---

## 📞 Need Help?

- Check Railway logs: Service → Deployments → Click deployment → View Logs
- Railway Docs: https://docs.railway.app
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

Good luck! 🚀


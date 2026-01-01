# How to Update Railway Deployment After Code Changes

## Problem
Your code is pushed to GitHub, but Railway is not showing the updated version.

## Solution: Trigger a New Deployment

### Option 1: Manual Redeploy (Quickest - 2 minutes)

1. **Go to Railway Dashboard**
   - Visit https://railway.app
   - Login with your GitHub account

2. **Select Your Frontend Service**
   - Click on your project
   - Click on the **Frontend Service** (the one with Root Directory: `ecotrade`)

3. **Trigger Redeploy**
   - Click on the **"Deployments"** tab
   - Click the **"..."** (three dots) menu on the latest deployment
   - Select **"Redeploy"**
   - OR click the **"Redeploy"** button if visible

4. **Wait for Build**
   - Railway will rebuild your frontend
   - This takes 5-10 minutes
   - Watch the logs to see progress
   - Wait for green checkmark ✅

5. **Clear Browser Cache**
   - After deployment completes, clear your browser cache
   - Or do a hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or open in incognito/private window

### Option 2: Verify Auto-Deploy is Enabled

1. **Check Service Settings**
   - Go to your Frontend Service
   - Click **"Settings"** tab
   - Scroll to **"Source"** section
   - Make sure **"Auto Deploy"** is **ENABLED** ✅

2. **If Auto-Deploy is Disabled**
   - Enable it
   - Railway will automatically deploy on every push

3. **Check GitHub Connection**
   - In Settings → Source
   - Verify it's connected to the correct branch (`main`)
   - Verify it's connected to the correct repository

### Option 3: Force New Deployment via Git

If auto-deploy is enabled but not working:

1. **Make a Small Change**
   ```bash
   # Add a comment to trigger rebuild
   echo "// Updated: $(date)" >> src/index.css
   ```

2. **Commit and Push**
   ```bash
   git add .
   git commit -m "Trigger Railway rebuild"
   git push origin main
   ```

3. **Railway Should Auto-Deploy**
   - Check Railway dashboard
   - New deployment should start automatically

## Verify Build Command is Correct

Make sure your Frontend Service has these settings:

1. **Root Directory**: `ecotrade`
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm start`

To check:
- Go to Service → Settings
- Verify these commands are set correctly

## Check Build Logs

If deployment fails:

1. **View Logs**
   - Go to Deployments tab
   - Click on the failed deployment
   - Click **"View Logs"**

2. **Common Issues**:
   - **Build Error**: Check if all dependencies are installed
   - **Missing Environment Variables**: Verify `VITE_BACKEND_URL` is set
   - **Build Timeout**: Increase build timeout in settings

## Clear Railway Build Cache

If old code keeps appearing:

1. **Go to Service Settings**
2. **Find "Build Cache"** section
3. **Click "Clear Cache"**
4. **Redeploy**

## Verify Deployment

After redeploy:

1. **Check Deployment Status**
   - Should show green checkmark ✅
   - Should show "Deployed successfully"

2. **Test Your Site**
   - Open your Railway frontend URL
   - Do hard refresh: `Ctrl+Shift+R`
   - Check if changes are visible

3. **Check Browser Console**
   - Press F12
   - Look for any errors
   - Check Network tab for failed requests

## Quick Checklist

- [ ] Code is pushed to GitHub (main branch)
- [ ] Railway service is connected to GitHub
- [ ] Auto-deploy is enabled
- [ ] Build command is correct: `npm install && npm run build`
- [ ] Start command is correct: `npm start`
- [ ] Root directory is set: `ecotrade`
- [ ] Environment variable `VITE_BACKEND_URL` is set
- [ ] Deployment shows green checkmark ✅
- [ ] Browser cache is cleared
- [ ] Hard refresh done (`Ctrl+Shift+R`)

## Still Not Working?

1. **Check Railway Logs**
   - Service → Deployments → Latest → View Logs
   - Look for errors or warnings

2. **Verify Git Branch**
   - Make sure you pushed to `main` branch
   - Railway should be watching `main` branch

3. **Contact Railway Support**
   - Railway dashboard → Help → Support
   - Or check Railway Discord

## Expected Behavior

After pushing to GitHub:
1. Railway detects new commit (if auto-deploy enabled)
2. Starts new build automatically
3. Runs `npm install && npm run build`
4. Creates new `dist` folder with updated code
5. Starts server with `npm start`
6. Serves new code from `dist` folder

**Note**: The build process compiles your React code into static files in the `dist` folder. Railway serves these static files. If the build doesn't run, you'll see old code.


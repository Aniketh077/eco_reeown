# Railway Quick Start - 5 Minute Setup

## 🚀 Quick Steps

### 1️⃣ Create Backend Service
- New Project → GitHub Repo → Select `eco_reeown`
- Settings → Root Directory: `server`
- Settings → Start Command: `npm start`
- Variables → Add all env vars (see checklist below)
- Deploy → Get backend URL

### 2️⃣ Create Frontend Service  
- Same project → New Service → GitHub Repo
- Settings → Root Directory: `ecotrade`
- Settings → Build Command: `npm install && npm run build`
- Settings → Start Command: `npm start`
- Variables → Add `VITE_BACKEND_URL` (use backend URL from step 1)
- Deploy → Get frontend URL

### 3️⃣ Update Backend
- Backend Service → Variables
- Update `FRONTEND_URL` = your frontend URL
- Auto-redeploys

---

## ✅ Environment Variables Checklist

### Backend Variables (Minimum Required):
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=(generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
FRONTEND_URL=https://your-frontend.railway.app
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
```

### Frontend Variables (Required):
```
VITE_BACKEND_URL=https://your-backend.railway.app
```

---

## 🔗 Test URLs

After deployment:
- Backend: `https://your-backend.railway.app/api/health`
- Frontend: `https://your-frontend.railway.app`

---

## 📋 Generate JWT Secret

Run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output to `JWT_SECRET` variable.

---

For detailed instructions, see `DEPLOYMENT_GUIDE.md`


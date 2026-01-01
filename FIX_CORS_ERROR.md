# How to Fix CORS Error on Railway

## 🔴 The Error You're Seeing:

```
Access to XMLHttpRequest at 'https://ecoreeown-production.up.railway.app/api/...' 
from origin 'https://ecoreeown-production-02a7.up.railway.app' 
has been blocked by CORS policy
```

## ✅ The Solution (2 minutes):

### Step 1: Go to Railway Backend Service
1. Open https://railway.app
2. Click on your **Backend Service** (the one with URL `ecoreeown-production.up.railway.app`)

### Step 2: Update FRONTEND_URL Variable
1. Click **"Variables"** tab
2. Find the variable named `FRONTEND_URL`
3. Click the **edit/pencil icon** ✏️
4. Update the value to:
   ```
   https://ecoreeown-production-02a7.up.railway.app
   ```
5. **IMPORTANT**: 
   - Include `https://`
   - NO trailing slash `/` at the end
   - Match EXACTLY (case-sensitive)
6. Click **"Update"** or **"Save"**

### Step 3: Wait for Redeployment
- Railway will automatically redeploy your backend
- Wait for the green checkmark ✅ (usually 1-2 minutes)

### Step 4: Test
1. Refresh your frontend page
2. The CORS error should be gone!
3. Check browser console (F12) - no more CORS errors

---

## 🔍 Why This Happens:

Your backend's CORS configuration only allows requests from URLs listed in the `FRONTEND_URL` environment variable. If the frontend URL doesn't match exactly, the browser blocks the request for security.

**Backend CORS Check:**
```javascript
// Backend checks: "Is the request coming from FRONTEND_URL?"
if (origin === process.env.FRONTEND_URL) {
  // Allow ✅
} else {
  // Block ❌
}
```

---

## 📋 Quick Checklist:

- [ ] Backend Service → Variables tab
- [ ] Find `FRONTEND_URL`
- [ ] Update to: `https://ecoreeown-production-02a7.up.railway.app`
- [ ] No trailing slash
- [ ] Wait for redeployment
- [ ] Test frontend

---

## 🚨 Common Mistakes:

❌ **Wrong:**
```
FRONTEND_URL=https://ecoreeown-production-02a7.up.railway.app/
```
(has trailing slash)

❌ **Wrong:**
```
FRONTEND_URL=ecoreeown-production-02a7.up.railway.app
```
(missing https://)

❌ **Wrong:**
```
FRONTEND_URL=https://ecoreeown-production.up.railway.app
```
(different URL)

✅ **Correct:**
```
FRONTEND_URL=https://ecoreeown-production-02a7.up.railway.app
```
(exact match, no trailing slash)

---

## 💡 Pro Tip:

If you change your frontend URL in the future, remember to update `FRONTEND_URL` in the backend service!

---

That's it! Your CORS error should be fixed now. 🎉


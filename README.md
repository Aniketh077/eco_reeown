# eco_reeown

EcoReeown - Premium Refurbished Electronics E-commerce Platform

## 🚀 Quick Deployment to Railway

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed step-by-step instructions.

**Quick Start**: See [RAILWAY_QUICK_START.md](./RAILWAY_QUICK_START.md) for a 5-minute setup guide.

## 📁 Project Structure

- `server/` - Backend API (Node.js/Express/MongoDB)
- `ecotrade/` - Frontend Application (React/Vite)

## 🔧 Setup Locally

### Backend
```bash
cd server
npm install
cp .env.example .env  # Create .env file with your variables
npm run dev
```

### Frontend
```bash
cd ecotrade
npm install
npm run dev
```

## 📝 Environment Variables

See `DEPLOYMENT_GUIDE.md` for complete list of required environment variables.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Payment**: Razorpay
- **Storage**: AWS S3
- **Email**: Gmail API


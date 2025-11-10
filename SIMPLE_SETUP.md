# Simple Setup - VitalBlaze Services

**SIMPLIFIED ARCHITECTURE:** One server, one command, everything works.

---

## 🎯 How It Works Now

```
Your Website (khewracrafts.com)
         ↓
    Node.js Server (Port 3000)
         ↓
    ├── Serves React Frontend (HTML/CSS/JS)
    └── Serves API (/api/services)
         ↓
    MongoDB Atlas (Cloud Database)
```

**No localhost, no ports, no complexity. Just one unified application.**

---

## ⚡ ONE COMMAND DEPLOYMENT

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
bash SIMPLE_DEPLOY.sh
```

**That's it!** This will:
1. Pull latest code
2. Install dependencies
3. Build React app
4. Start server
5. Connect to MongoDB
6. Serve everything on https://khewracrafts.com

---

## 📋 Prerequisites

You only need:
1. ✅ MongoDB connection string (you have it)
2. ✅ `.env` file with credentials
3. ✅ That's all!

---

## 🔧 First Time Setup (One Time Only)

### Step 1: Create .env File

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

cat > .env << 'EOF'
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:YOUR_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=vital-session-secret-2024
JWT_SECRET=vital-jwt-secret-2024
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
EOF

# Edit to add your MongoDB password
nano .env
```

Replace `YOUR_PASSWORD` with your actual MongoDB password.

### Step 2: Initialize Database

```bash
npm run init-db
```

This imports all services into MongoDB.

### Step 3: Deploy

```bash
bash SIMPLE_DEPLOY.sh
```

---

## ✅ That's It!

Open: **https://khewracrafts.com**

Services will show automatically. No port configuration, no localhost setup needed.

---

## 🔄 How To Update Later

Anytime you want to update:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
bash SIMPLE_DEPLOY.sh
```

Done!

---

## 🔍 Check If It's Working

```bash
# Check server is running
ps aux | grep "server/index.js"

# Check server logs
tail -50 server.log

# Test API
curl http://localhost:3000/api/services
```

---

## 🛑 Stop Server

```bash
pkill -f "server/index.js"
```

---

## 🚀 Start Server

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
NODE_ENV=production nohup node server/index.js > server.log 2>&1 &
```

---

## 📊 What Happens When Server Starts

```
✅ MongoDB Connected
📊 Database: vitalservices
🟢 Mongoose connected to MongoDB
==================================================
🚀 VitalBlaze Services Server Started
==================================================
📦 Environment: production
🌐 Port: 3000
==================================================
```

---

## 🌐 How It Works

1. **Server starts** on port 3000
2. **Connects to MongoDB** (gets all services)
3. **Serves React app** (your website frontend)
4. **Serves API** at `/api/services`, `/api/admin`, etc.
5. **Frontend calls API** using relative URLs (no localhost needed)
6. **API fetches from MongoDB** and returns data
7. **Frontend displays services**

**Everything is connected automatically!**

---

## 📁 File Structure

```
/var/www/vhosts/khewracrafts.com/httpdocs/
├── .env                      # Your configuration
├── server/
│   ├── index.js             # Server (API + serves frontend)
│   ├── config/database.js   # MongoDB connection
│   ├── models/              # User & Service models
│   └── routes/              # API routes
├── client/
│   ├── src/                 # React source code
│   └── build/               # Built frontend (auto-generated)
└── SIMPLE_DEPLOY.sh         # One-command deployment
```

---

## 🎯 Summary

**Old way (complex):**
- Localhost setup
- Port configuration
- Separate frontend/backend
- Multiple servers
- Complicated!

**New way (simple):**
- One server
- One command
- MongoDB connection
- Everything works
- Simple!

---

## ✨ What Changed

✅ **API URLs:** No more `localhost:5000` - uses relative paths  
✅ **Server:** Serves both frontend and API from port 3000  
✅ **MongoDB:** Direct connection, fetches data automatically  
✅ **No proxy:** Everything on same origin  
✅ **One command:** Deploy, update, restart - all simple  

---

## 🔧 Troubleshooting

### Services not showing?

1. **Hard refresh browser:** Ctrl+Shift+R
2. **Check server running:** `ps aux | grep "server/index.js"`
3. **Check logs:** `tail -50 server.log`
4. **Restart:** `bash SIMPLE_DEPLOY.sh`

### Server won't start?

1. **Check .env file:** `cat .env | grep MONGODB_URI`
2. **Check MongoDB password:** Make sure it's correct
3. **Check logs:** `cat server.log`

### API errors?

1. **Test API:** `curl http://localhost:3000/api/services`
2. **Should return:** `{"success":true,"count":15,...}`
3. **If not:** Check MongoDB connection in `.env`

---

## 📞 Support

Everything should just work now. If you have issues:

1. Check `server.log`
2. Run `bash DIAGNOSE.sh` for full diagnostic
3. Email: vitalservices@vitalblaze.com

---

**🎉 Your website is now simple and production-ready!**

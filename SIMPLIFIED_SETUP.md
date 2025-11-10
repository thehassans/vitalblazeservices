# Simplified Setup - Pure MongoDB, No Localhost

Your code is now simplified:
- ✅ **No localhost references**
- ✅ **Pure MongoDB connection**
- ✅ **Relative API URLs**
- ✅ **Production-ready**

---

## 🎯 **How It Works:**

```
Your Domain
    ↓
Node.js Server (Port 3000)
    ↓
MongoDB Atlas Cloud Database
    ↓
Returns Your Services
```

**Simple. Clean. No localhost.**

---

## ⚡ **Deploy Now:**

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Pull simplified code
git pull origin main

# Make sure .env has MongoDB URI
cat .env | grep MONGODB_URI

# Kill old processes
pkill -9 node
sleep 2

# Build client
cd client && npm run build && cd ..

# Start server
NODE_ENV=production node server/index.js > server.log 2>&1 &

# Wait and test
sleep 5
curl -s http://localhost:3000/api/services | grep -o '"count":[0-9]*'
```

---

## 🔧 **Configure Plesk (One Time):**

Since Plesk is running a separate Node.js instance, you need to give it your MongoDB credentials:

### **In Plesk Panel:**

1. Go to **Node.js** section
2. Click **"Environment Variables"**
3. Add variable:
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb+srv://vitalservices:YOUR_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices`
4. Add variable:
   - **Name:** `NODE_ENV`
   - **Value:** `production`
5. Click **"Restart App"**

**Replace `YOUR_PASSWORD` with your actual MongoDB password!**

---

## ✅ **That's It!**

No localhost logic, no port confusion. Just:
- MongoDB connection
- Server reads from MongoDB
- Frontend calls API
- Everything works

---

## 🧪 **Test:**

```bash
# Both should return 15 services now
curl https://khewracrafts.com/api/services | head -50
```

---

## 📊 **What Changed:**

**Before:**
- Localhost fallbacks
- Port configuration
- Complex setup

**Now:**
- Direct MongoDB connection
- Relative URLs
- Simple and clean

---

**Just add MongoDB URI to Plesk and you're done!** 🚀

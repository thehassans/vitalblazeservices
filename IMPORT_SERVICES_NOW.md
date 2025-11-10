# Import Services to MongoDB - Quick Fix

Your MongoDB is connected but has no services data yet. Run this command to import all services.

---

## 🚀 **Single Command to Fix Everything:**

SSH into your server and run:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs && npm run init-db && touch tmp/restart.txt
```

**This will:**
1. Navigate to your project
2. Import all 20+ services into MongoDB
3. Restart the application

---

## 📊 **Expected Output:**

```
✅ Connected to MongoDB
🟢 Mongoose connected to MongoDB

Admin user already exists (or created)

📦 Importing services...
✅ Services imported: 20
ℹ️  Services skipped (already exist): 0
📊 Total services in database: 20

🎉 Database initialization complete!
🔌 Database connection closed
```

---

## ✅ **Verify Services Are Imported:**

After running the command, check if services exist in MongoDB:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Test the API
curl http://localhost:3000/api/services | jq '.count'
```

**Expected:** `20` (or the total number of services)

---

## 🌐 **Then Check Your Website:**

1. Refresh: https://khewracrafts.com
2. Services should now appear in the "Comprehensive Solutions" section
3. You should see:
   - VPS Hosting
   - Dedicated Servers
   - CRM & POS Complete Solution
   - Domain Registration
   - And 16+ more services

---

## 🔍 **Still Not Showing? Debug Steps:**

### 1. Check if services are in database:
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
node -e "require('dotenv').config(); const mongoose = require('mongoose'); const Service = require('./server/models/Service'); mongoose.connect(process.env.MONGODB_URI).then(async () => { const count = await Service.countDocuments(); console.log('Services in DB:', count); process.exit(); });"
```

**Expected:** `Services in DB: 20`

### 2. Check API endpoint directly:
```bash
curl http://localhost:3000/api/services
```

**Should return JSON with all services.**

### 3. Check server logs:
```bash
# In Plesk, check logs or run:
tail -f /var/www/vhosts/khewracrafts.com/logs/error_log
```

### 4. Check browser console:
- Open https://khewracrafts.com
- Press `F12` (Developer Tools)
- Check Console tab for errors
- Check Network tab for failed API requests

---

## 🔧 **Common Issues:**

### Issue 1: "Command not found: npm"
**Solution:** Make sure you're in the right directory
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
which npm
```

### Issue 2: "Cannot find module 'dotenv'"
**Solution:** Install dependencies first
```bash
npm install
npm run init-db
```

### Issue 3: "MONGODB_URI is undefined"
**Solution:** Create .env file (see PLESK_MONGODB_FIX.md)
```bash
cat > .env << 'EOF'
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:YOUR_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=vital-session-2024
JWT_SECRET=vital-jwt-2024
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
EOF

nano .env  # Add your MongoDB password
```

### Issue 4: Services imported but still not showing
**Solution:** Check client API URL

1. Check if frontend is pointing to correct API:
```bash
cat client/build/static/js/main.*.js | grep "api/services"
```

2. Or rebuild the client:
```bash
cd client
npm run build
cd ..
touch tmp/restart.txt
```

---

## 🎯 **Quick Checklist:**

- [ ] MongoDB connected (✅ you confirmed this)
- [ ] .env file exists with correct MONGODB_URI
- [ ] Run `npm run init-db`
- [ ] See "✅ Services imported: 20"
- [ ] Run `touch tmp/restart.txt` to restart
- [ ] Refresh website
- [ ] Services appear

---

## 📝 **One-Line Quick Fix:**

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs && npm run init-db && touch tmp/restart.txt && echo "✅ Done! Refresh your website."
```

---

## 🆘 **Still Having Issues?**

Run this diagnostic script:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

echo "=== Checking Environment ==="
cat .env | grep MONGODB_URI | head -c 50
echo "..."

echo -e "\n=== Checking Database Connection ==="
node -e "require('dotenv').config(); console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);"

echo -e "\n=== Checking Services Count ==="
npm run init-db 2>&1 | grep -E "(Services imported|Total services)"

echo -e "\n=== Testing API ==="
curl -s http://localhost:3000/api/services | grep -o '"count":[0-9]*'

echo -e "\n✅ Diagnostic complete"
```

---

**Just run: `npm run init-db` and your services will appear!** 🚀

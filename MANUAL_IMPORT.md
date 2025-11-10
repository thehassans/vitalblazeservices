# Manual Service Import - Step by Step

If `npm run init-db` isn't working, follow these exact steps.

---

## 🔍 **Step 1: Check What Went Wrong**

Run this in SSH and **copy the entire output**:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
npm run init-db 2>&1
```

**Share the output!** It will tell us exactly what's wrong.

---

## 🔧 **Step 2: Manual Import (If Above Failed)**

If the npm command failed, run this direct command:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
node server/scripts/initDatabase.js
```

**Expected output:**
```
✅ Connected to MongoDB
✅ Admin user created successfully
📦 Importing services...
✅ Services imported: 15
📊 Total services in database: 15
🎉 Database initialization complete!
```

---

## 🔍 **Step 3: Verify Services Are in Database**

```bash
curl -s http://localhost:3000/api/services | grep -o '"count":[0-9]*'
```

**Should show:** `"count":15` or similar

---

## 🚨 **Common Errors & Fixes:**

### Error: "MONGODB_URI is not defined"
**Fix:**
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
cat .env | grep MONGODB_URI
```
If empty, create .env file:
```bash
nano .env
```
Add:
```
MONGODB_URI=mongodb+srv://vitalservices:YOUR_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
```

### Error: "Cannot find module"
**Fix:**
```bash
npm install
```

### Error: "MongooseError: Operation buffering timed out"
**Fix:** MongoDB password is wrong or connection blocked

### Error: "Services imported: 0, skipped: 15"
**Meaning:** Services already exist!
**Check:**
```bash
curl http://localhost:3000/api/services | head -50
```

---

## 🔄 **If Services Already Exist But Not Showing:**

### Check 1: Is server running?
```bash
ps aux | grep "server/index.js" | grep -v grep
```

If NOT running:
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
NODE_ENV=production node server/index.js &
```

### Check 2: Is API accessible?
```bash
curl https://khewracrafts.com/api/services | head -50
```

Should return JSON with services.

### Check 3: Is frontend built?
```bash
ls -lh /var/www/vhosts/khewracrafts.com/httpdocs/client/build/index.html
```

If missing:
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs/client
npm run build
```

---

## ⚡ **Complete Reset (Nuclear Option):**

If nothing works, this will clear and reimport everything:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Stop server
pkill -f "server/index.js"

# Pull latest code
git pull origin main

# Install dependencies
npm install
cd client
npm install
npm run build
cd ..

# Run this Node script to force clear and reimport
node -e "
const mongoose = require('mongoose');
const Service = require('./server/models/Service');
const { services } = require('./server/data/memoryDb');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log('Connected to MongoDB');
  
  // Clear all services
  await Service.deleteMany({});
  console.log('Cleared existing services');
  
  // Import all services
  for (const s of services) {
    await Service.create(s);
  }
  
  const count = await Service.countDocuments();
  console.log('Imported services:', count);
  
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
"

# Start server
NODE_ENV=production nohup node server/index.js > server.log 2>&1 &

# Wait and test
sleep 5
curl http://localhost:3000/api/services | head -50
```

---

## 📋 **Tell Me:**

1. What does `npm run init-db` output show?
2. What does `curl http://localhost:3000/api/services` return?
3. Is the server running? (`ps aux | grep server/index.js`)

**Share these outputs and I'll tell you exactly what to do!**

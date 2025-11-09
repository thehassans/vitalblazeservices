# 🔧 Fix Admin Panel Deployment

## ✅ **What Was Fixed**

The admin panel was showing errors because:
1. ❌ Hardcoded `http://localhost:5000` URLs won't work in production
2. ❌ MongoDB environment variables not set in Plesk
3. ❌ New dependencies not installed

### **Solutions Implemented:**

✅ Created API configuration that auto-detects environment  
✅ Updated all admin pages to use dynamic API URLs  
✅ Added MongoDB Atlas integration  
✅ Added JWT authentication  

---

## 🚀 **Quick Fix - Deploy to Plesk**

### **Step 1: Set Environment Variables in Plesk**

1. **Log in to Plesk**
2. **Go to your domain** → `khewracrafts.com`
3. **Click "Node.js"** in the left sidebar
4. **Scroll to "Custom environment variables"**
5. **Click "[specify]"**
6. **Add these variables** (one per line):

```env
MONGODB_URI=mongodb+srv://vitalservices:Hassanvitalblaze123@vitalservices.hgqktr5.mongodb.net/?appName=vitalservices
JWT_SECRET=vitalblaze-jwt-secret-2024-change-in-production
SESSION_SECRET=vitalblaze-session-secret-2024
NODE_ENV=production
PORT=3000
```

7. **Click "OK"** to save

---

### **Step 2: Deploy New Code**

#### **Option A: Via Plesk Git** (Recommended)

1. In Plesk, go to **Git** section
2. Click **"Pull Updates"**
3. Wait for completion

#### **Option B: Via SSH**

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
git pull origin main
```

---

### **Step 3: Install Dependencies**

```bash
# In Plesk SSH or Terminal
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

---

### **Step 4: Initialize Database**

```bash
npm run init-db
```

**Expected Output:**
```
✅ MongoDB Connected
✅ Admin user created successfully
   Username: vitalservices
   Password: Hassanvitalblaze123
✅ Successfully imported 30 services
```

---

### **Step 5: Build React App**

```bash
cd client
npm run build
cd ..
```

---

### **Step 6: Restart Application**

1. Go to **Plesk** → **Node.js** settings
2. Click **"Restart App"** button
3. Wait 10-15 seconds

---

## ✅ **Verify It Works**

### **Test Admin Login:**

1. Go to: `https://khewracrafts.com/admin`
2. Login with:
   - **Username**: `vitalservices`
   - **Password**: `Hassanvitalblaze123`
3. You should see the admin dashboard

---

## 🔐 **New Login Credentials**

| Field | Value |
|-------|-------|
| **Admin URL** | `https://khewracrafts.com/admin` |
| **Username** | `vitalservices` |
| **Password** | `Hassanvitalblaze123` |
| **Database** | MongoDB Atlas |

---

## 📋 **Complete Deployment Commands (Copy & Paste)**

```bash
# Navigate to project
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Pull latest code
git pull origin main

# Install dependencies
npm install
cd client && npm install && cd ..

# Initialize database
npm run init-db

# Build React app
cd client && npm run build && cd ..

# Then restart via Plesk Node.js panel
```

---

## 🛠️ **Troubleshooting**

### **Issue: "Cannot connect to MongoDB"**

**Solution:**
1. Check MongoDB Atlas is online
2. Verify `MONGODB_URI` in Plesk environment variables
3. Check MongoDB Atlas Network Access allows all IPs (0.0.0.0/0)

### **Issue: "Invalid credentials"**

**Solution:**
1. Run `npm run init-db` again to recreate admin user
2. Username is `vitalservices` (not email)
3. Password is case-sensitive: `Hassanvitalblaze123`

### **Issue: "Module not found"**

**Solution:**
```bash
npm install
cd client && npm install && cd ..
```

### **Issue: Admin page still shows error**

**Solution:**
1. Clear browser cache (Ctrl + Shift + Delete)
2. Rebuild React app: `cd client && npm run build && cd ..`
3. Restart Node.js app in Plesk
4. Check if environment variables are set correctly

---

## 📊 **What Changed**

### **New Files:**
- `client/src/config/api.js` - API configuration
- `server/config/database.js` - MongoDB connection
- `server/models/Admin.js` - Admin schema
- `server/models/Service.js` - Service schema
- `server/scripts/initDatabase.js` - DB initialization

### **Updated Files:**
- `client/src/pages/AdminLogin.js` - Uses API config
- `client/src/pages/AdminDashboard.js` - Uses API config
- `client/src/pages/AdminCurrency.js` - Uses API config
- `server/routes/admin.js` - MongoDB + JWT auth
- `server/routes/services.js` - MongoDB queries
- `server/index.js` - MongoDB connection
- `package.json` - Added mongoose, bcryptjs, jsonwebtoken

---

## ✨ **Benefits**

| Before | After |
|--------|-------|
| ❌ Hardcoded localhost URLs | ✅ Dynamic API detection |
| ❌ In-memory data (lost on restart) | ✅ MongoDB Atlas (persistent) |
| ❌ Simple session auth | ✅ JWT token auth |
| ❌ No password hashing | ✅ Bcrypt password security |
| ❌ Manual service updates | ✅ Database-driven updates |

---

## 🎯 **After Deployment**

Your admin panel will be fully functional with:

- ✅ Secure login with JWT tokens
- ✅ Persistent data in MongoDB Atlas
- ✅ Works in both development and production
- ✅ Secure password hashing
- ✅ All services managed in database

---

## 📞 **Need Help?**

If you encounter any issues:

1. Check server logs in Plesk
2. Check browser console (F12)
3. Verify all environment variables are set
4. Ensure MongoDB Atlas is accessible

---

**Your admin panel will be working after following these steps!** 🎉

# 🗄️ MongoDB Setup Guide - VitalBlaze Services

Complete guide for setting up MongoDB Atlas with your VitalServices project.

---

## ✅ **What's Been Configured**

Your project is now fully configured with MongoDB Atlas:

- **Database**: MongoDB Atlas Cloud
- **Connection String**: `mongodb+srv://vitalservices:Hassanvitalblaze123@vitalservices.hgqktr5.mongodb.net/`
- **Admin Username**: `vitalservices`
- **Admin Password**: `Hassanvitalblaze123`

---

## 📋 **Prerequisites**

1. **Node.js** installed (v14 or higher)
2. **MongoDB Atlas** account (already set up)
3. **Internet connection** (for MongoDB Atlas)

---

## 🚀 **Quick Setup (3 Steps)**

### **Step 1: Create `.env` File**

Copy the example environment file:

```bash
cp .env.example .env
```

Or create a new `.env` file in the root directory with this content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Database
MONGODB_URI=mongodb+srv://vitalservices:Hassanvitalblaze123@vitalservices.hgqktr5.mongodb.net/?appName=vitalservices

# JWT Secret (change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Credentials (for reference only, stored in DB)
ADMIN_USERNAME=vitalservices
ADMIN_PASSWORD=Hassanvitalblaze123

# Email Configuration (Optional for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# CORS Configuration
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000
```

---

### **Step 2: Install Dependencies**

```bash
npm install
cd client
npm install
cd ..
```

Or use the shortcut:

```bash
npm run install-all
```

---

### **Step 3: Initialize Database**

This will:
- Connect to MongoDB Atlas
- Create admin user: `vitalservices` / `Hassanvitalblaze123`
- Import all services from `memoryDb.js`

```bash
npm run init-db
```

**Expected Output:**
```
🚀 Starting database initialization...
📡 Connecting to MongoDB...
✅ MongoDB Connected

👤 Setting up admin user...
✅ Admin user created successfully
   Username: vitalservices
   Password: Hassanvitalblaze123

🛠️  Setting up services...
📦 Importing 30 services...
✅ Successfully imported 30 services

📊 Database Summary:
   Total Admins: 1
   Total Services: 30

✨ Database initialization completed successfully!
```

---

## 🏃 **Run the Application**

### **Development Mode:**

```bash
# Terminal 1: Start server
npm run server

# Terminal 2: Start client
cd client
npm start
```

Or run both together:

```bash
npm run dev
```

### **Production Mode:**

```bash
# Build client
npm run build

# Start server
NODE_ENV=production npm start
```

---

## 🔐 **Admin Login**

After initialization, you can log in to the admin panel:

- **URL**: `http://localhost:3000/admin`
- **Username**: `vitalservices`
- **Password**: `Hassanvitalblaze123`

---

## 📁 **What's New in Your Project**

### **New Files Created:**

```
server/
├── config/
│   └── database.js          # MongoDB connection logic
├── models/
│   ├── Admin.js             # Admin user schema
│   └── Service.js           # Service schema
└── scripts/
    └── initDatabase.js      # Database initialization script
```

### **Updated Files:**

```
package.json                 # Added mongoose, bcryptjs, jsonwebtoken
server/index.js              # Added MongoDB connection
server/routes/admin.js       # Updated to use MongoDB + JWT
server/routes/services.js    # Updated to use MongoDB
.env.example                 # Added MongoDB URI
```

---

## 🗄️ **Database Structure**

### **Collections:**

#### **1. admins**
```javascript
{
  _id: ObjectId,
  username: "vitalservices",
  password: "hashed_password",
  email: "info@vitalblaze.com",
  role: "superadmin",
  isActive: true,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### **2. services**
```javascript
{
  _id: ObjectId,
  id: 1,
  name: "Shared Hosting",
  category: "Hosting & Servers",
  description: "Reliable shared hosting...",
  features: ["99.9% Uptime", "Free SSL", ...],
  icon: "server",
  priceSAR: "49",
  priceGBP: "10",
  priceType: "month",
  popular: false,
  isActive: true,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 **MongoDB Atlas Configuration**

### **Connection Details:**

- **Cluster**: `vitalservices.hgqktr5.mongodb.net`
- **Database Name**: Will be auto-created
- **Username**: `vitalservices`
- **Password**: `Hassanvitalblaze123`

### **IP Whitelist:**

Make sure your IP is whitelisted in MongoDB Atlas:

1. Go to **MongoDB Atlas Dashboard**
2. Navigate to **Network Access**
3. Click **Add IP Address**
4. Choose **Allow Access from Anywhere** (0.0.0.0/0) for development
5. For production, add only your server's IP

---

## 🔒 **Security Considerations**

### **⚠️ IMPORTANT: Change These Before Production!**

1. **JWT_SECRET**: Generate a strong random secret
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Admin Password**: Change after first login
   ```javascript
   // In MongoDB Atlas or via script
   // Update the admin password
   ```

3. **MongoDB Password**: Consider rotating the password
   - Update in MongoDB Atlas
   - Update in `.env` file
   - Update in Plesk environment variables

---

## 🌐 **Plesk Deployment Setup**

### **1. Add Environment Variable in Plesk:**

1. Go to your domain in Plesk
2. Click **Node.js** settings
3. Scroll to **Custom environment variables**
4. Click **[specify]**
5. Add this line:

```
MONGODB_URI=mongodb+srv://vitalservices:Hassanvitalblaze123@vitalservices.hgqktr5.mongodb.net/?appName=vitalservices
```

6. Also add:

```
JWT_SECRET=your-generated-secret-key-here
```

### **2. Upload Files to Plesk:**

```bash
# Via Git
git add .
git commit -m "Add MongoDB integration"
git push origin main

# Then in Plesk SSH
cd /var/www/vhosts/khewracrafts.com/httpdocs
git pull origin main
npm install
npm run init-db
npm run build
```

### **3. Restart Application:**

Go to **Plesk → Node.js** and click **Restart**

---

## 📊 **Verify Setup**

### **Test API Endpoints:**

```bash
# Check database connection
curl http://localhost:5000/api/health

# Get all services
curl http://localhost:5000/api/services

# Test admin login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"vitalservices","password":"Hassanvitalblaze123"}'
```

---

## 🛠️ **Troubleshooting**

### **Issue: Cannot connect to MongoDB**

**Solution:**
1. Check internet connection
2. Verify MongoDB URI in `.env`
3. Check IP whitelist in MongoDB Atlas
4. Ensure password has no special characters that need encoding

### **Issue: Admin login fails**

**Solution:**
1. Run `npm run init-db` to ensure admin is created
2. Check username: `vitalservices` (not email)
3. Verify password: `Hassanvitalblaze123` (case-sensitive)

### **Issue: Services not loading**

**Solution:**
1. Check if services were imported: `npm run init-db`
2. Verify MongoDB connection in server logs
3. Check browser console for API errors

---

## 📞 **Support**

If you encounter any issues:

1. **Check Logs**: `npm run server` and see console output
2. **MongoDB Atlas**: Check cluster status
3. **Environment Variables**: Ensure `.env` is correctly configured

---

## ✨ **Next Steps**

1. ✅ MongoDB is set up and running
2. ✅ Admin user created
3. ✅ Services imported
4. 🔄 **Test admin login** at http://localhost:3000/admin
5. 🔄 **Test services** at http://localhost:3000
6. 🔄 **Deploy to Plesk** using the guide above

---

**Your MongoDB Atlas database is now ready to use!** 🎉

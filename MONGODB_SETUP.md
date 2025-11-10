# 🚀 MongoDB Setup Guide - VitalServices

## ✅ **Your MongoDB Connection String**
```
mongodb+srv://vitalservices:vitalblazevitalservice@vitalservices.hgqktr5.mongodb.net/?appName=vitalservices
```

---

## 📋 **Step-by-Step Setup**

### **1. Create `.env` File**

Create a file named `.env` in the root directory:

```bash
# Navigate to project root
cd C:\Users\buysialllc\Desktop\VitalServices

# Create .env file (Windows)
type nul > .env
```

Add this content to `.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://vitalservices:vitalblazevitalservice@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority&appName=vitalservices

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=vitalservice975312468

# Email Configuration (optional for now)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@vitalblaze.com
EMAIL_TO=info@vitalblaze.com

# CORS Configuration
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000

# Security Keys
SESSION_SECRET=vitalblaze-session-secret-key-2024
JWT_SECRET=vitalblaze-jwt-secret-key-2024
```

---

### **2. Install Dependencies**

```bash
# Install backend dependencies (including mongoose)
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

---

### **3. Seed Database**

Populate MongoDB with all services:

```bash
npm run seed
```

**Expected Output:**
```
🌱 Starting database seeding...
✅ Connected to MongoDB
🗑️  Cleared existing services
✅ Successfully seeded 18 services

📊 Seeded Services:
   - VPS Hosting (ID: 3)
   - Dedicated Servers (ID: 4)
   - Domain Registration (ID: 5)
   ...
   - Android & iOS App Development (ID: 22)

🎉 Database seeding completed successfully!
```

---

### **4. Start Development Server**

```bash
# Start backend only
npm run server

# OR start both backend and frontend
npm run dev
```

---

## 🔧 **Project Structure**

```
VitalServices/
├── .env                              # ⭐ YOUR CREDENTIALS (created)
├── server/
│   ├── config/
│   │   └── database.js              # ✅ MongoDB connection
│   ├── models/
│   │   └── Service.js               # ✅ Service schema
│   ├── seeders/
│   │   └── serviceSeeder.js         # ✅ Database seeder
│   ├── routes/
│   │   ├── services.js              # ✅ Updated to use MongoDB
│   │   ├── admin.js                 # ✅ Updated to use MongoDB
│   │   └── contact.js               # Unchanged
│   └── index.js                     # ✅ Updated with DB connection
└── package.json                     # ✅ Added mongoose dependency
```

---

## 📊 **MongoDB Collections**

### **Services Collection**
```javascript
{
  id: Number,              // Unique service ID (3, 4, 5, ...)
  category: String,        // 'Hosting & Servers', 'Business Solutions', etc.
  name: String,            // Service name
  description: String,     // Service description
  features: [String],      // Array of features
  priceSAR: String,        // SAR price
  priceGBP: String,        // GBP price
  priceType: String,       // 'mo', 'yr', null
  icon: String,            // Icon name
  popular: Boolean,        // Featured flag
  createdAt: Date,         // Auto-generated
  updatedAt: Date          // Auto-generated
}
```

---

## 🎯 **Testing the Setup**

### **1. Check MongoDB Connection**

Start the server:
```bash
npm run server
```

Look for:
```
✅ MongoDB Connected: vitalservices.hgqktr5.mongodb.net
📦 Database: vitalservices
Server is running on port 5000
```

### **2. Test API Endpoints**

**Get all services:**
```bash
curl http://localhost:5000/api/services
```

**Get service by ID:**
```bash
curl http://localhost:5000/api/services/12
```

**Get services by category:**
```bash
curl http://localhost:5000/api/services/category/Business%20Solutions
```

---

## 🔐 **Admin Panel**

### **Login Credentials:**
- **Email:** `vitalservices@vitalblaze.com`
- **Password:** `vitalservice975312468`

### **Access:**
```
http://localhost:3000/admin
```

### **Features:**
- View all services
- Update service prices
- Bulk currency conversion
- Real-time MongoDB updates

---

## 🌐 **For Production (Plesk)**

### **Add to Plesk Environment Variables:**

```env
MONGODB_URI=mongodb+srv://vitalservices:vitalblazevitalservice@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority&appName=vitalservices
NODE_ENV=production
PORT=3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=vitalservice975312468
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
SESSION_SECRET=vitalblaze-session-secret-key-2024
JWT_SECRET=vitalblaze-jwt-secret-key-2024
```

### **Deployment Steps:**

```bash
# 1. Push to GitHub
git add .
git commit -m "Setup MongoDB Atlas integration"
git push origin main

# 2. On Plesk server
cd /var/www/vhosts/khewracrafts.com/httpdocs
git pull origin main
npm install
npm run seed  # Run once to populate database
cd client
npm run build
# Restart Node.js app in Plesk
```

---

## ❌ **Troubleshooting**

### **Error: "MONGODB_URI is not defined"**
✅ **Solution:** Create `.env` file with MongoDB connection string

### **Error: "Failed to connect to MongoDB"**
✅ **Solution:** Check internet connection and MongoDB Atlas whitelist
- Go to MongoDB Atlas → Network Access
- Add IP Address: `0.0.0.0/0` (allow all)

### **Error: "Services not found"**
✅ **Solution:** Run database seeder
```bash
npm run seed
```

### **Error: "Cannot find module 'mongoose'"**
✅ **Solution:** Install dependencies
```bash
npm install
```

---

## 📈 **Database Management**

### **View Database (MongoDB Compass)**
1. Download MongoDB Compass
2. Connect with URI:
   ```
   mongodb+srv://vitalservices:vitalblazevitalservice@vitalservices.hgqktr5.mongodb.net/
   ```
3. Select database: `vitalservices`
4. View collection: `services`

### **Re-seed Database**
```bash
npm run seed
```

### **Backup Database**
```bash
# Using mongodump (requires MongoDB tools)
mongodump --uri="mongodb+srv://vitalservices:vitalblazevitalservice@vitalservices.hgqktr5.mongodb.net/vitalservices"
```

---

## ✅ **Setup Complete Checklist**

- [ ] `.env` file created with MongoDB URI
- [ ] Dependencies installed (`npm install`)
- [ ] Database seeded (`npm run seed`)
- [ ] Server starts without errors
- [ ] Can fetch services from API
- [ ] Admin panel accessible
- [ ] Frontend displays services

---

## 🎉 **You're All Set!**

Your VitalServices application is now connected to MongoDB Atlas!

**Next Steps:**
1. Start development: `npm run dev`
2. Access frontend: http://localhost:3000
3. Access admin: http://localhost:3000/admin
4. Monitor MongoDB: https://cloud.mongodb.com

---

## 📞 **Support**

If you encounter any issues:
1. Check console for error messages
2. Verify `.env` file exists and is correct
3. Ensure MongoDB Atlas allows connections
4. Run `npm run seed` to populate database

**MongoDB Atlas Dashboard:** https://cloud.mongodb.com
**Cluster:** vitalservices.hgqktr5.mongodb.net

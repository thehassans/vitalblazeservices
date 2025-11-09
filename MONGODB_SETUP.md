# MongoDB Setup Guide

Complete guide to set up MongoDB for VitalBlaze Services project.

---

## 📋 Prerequisites

- Node.js installed
- MongoDB Atlas account (or local MongoDB)
- Your MongoDB connection string

---

## 🔑 Your MongoDB Credentials

**MongoDB URI:**
```
mongodb+srv://vitalservices:<db_password>@vitalservices.hgqktr5.mongodb.net/?appName=vitalservices
```

**Admin Credentials:**
- Email: `vitalservices@vitalblaze.com`
- Password: `vitalservice975312468`

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Install Dependencies

```bash
cd C:\Users\buysialllc\Desktop\VitalServices
npm install
```

This installs:
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `express-session` - Session management

---

### Step 2: Create `.env` File

Create a file named `.env` in the project root:

```bash
# Copy this content to .env file

# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Database Configuration
MONGODB_URI=mongodb+srv://vitalservices:YOUR_MONGODB_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
# Replace YOUR_MONGODB_PASSWORD with your actual MongoDB password

# Admin Credentials
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468

# Security Keys (generate random strings for production)
SESSION_SECRET=vital-session-secret-key-change-in-production
JWT_SECRET=vital-jwt-secret-key-change-in-production

# Email Configuration (for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@vitalblaze.com
EMAIL_TO=info@vitalblaze.com

# CORS Configuration
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000
```

**Important:** Replace `YOUR_MONGODB_PASSWORD` with your actual MongoDB password!

---

### Step 3: Initialize Database

Run the initialization script to create admin user and import services:

```bash
npm run init-db
```

This will:
- ✅ Connect to MongoDB
- ✅ Create admin user (vitalservices@vitalblaze.com)
- ✅ Import all 20+ services from memoryDb
- ✅ Set up indexes

**Expected Output:**
```
✅ Connected to MongoDB
✅ Admin user created successfully
   Email: vitalservices@vitalblaze.com
   Password: vitalservice975312468
📦 Importing services...
✅ Services imported: 20
📊 Total services in database: 20
🎉 Database initialization complete!
```

---

### Step 4: Start the Server

```bash
npm run server
```

Or for development with auto-reload:
```bash
npm run dev
```

**Expected Output:**
```
✅ MongoDB Connected: vitalservices.hgqktr5.mongodb.net
📊 Database: vitalservices
🟢 Mongoose connected to MongoDB
Server running on port 5000
```

---

### Step 5: Test Admin Login

1. Navigate to: `http://localhost:3000/admin`
2. Login with:
   - Email: `vitalservices@vitalblaze.com`
   - Password: `vitalservice975312468`
3. You should see the Admin Dashboard

---

## 📁 MongoDB Structure

### Collections Created:

#### 1. **users**
```javascript
{
  email: "vitalservices@vitalblaze.com",
  password: "hashed_password",
  role: "admin",
  isActive: true,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. **services**
```javascript
{
  id: 3,
  name: "VPS Hosting",
  category: "Hosting & Servers",
  description: "...",
  features: ["...", "..."],
  icon: "hard-drive",
  priceSAR: "99",
  priceGBP: "20",
  priceType: "month",
  popular: false,
  isActive: true,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Features

### Password Security
- Passwords are hashed using `bcryptjs` with salt rounds (10)
- Never stored in plain text
- Automatic hashing on user creation

### JWT Authentication
- 24-hour token expiration
- Role-based access control
- Secure token verification

### API Protection
- All admin routes require valid JWT token
- Token must contain admin role
- Automatic token expiration handling

---

## 🛠️ Database Scripts

### Initialize/Re-initialize Database
```bash
npm run init-db
```

### Check Database Connection
The health endpoint shows MongoDB status:
```bash
GET http://localhost:5000/api/health
```

---

## 📊 API Endpoints (MongoDB)

### Public Endpoints

**Get all services:**
```
GET /api/services
```

**Get service by ID:**
```
GET /api/services/:id
```

**Get services by category:**
```
GET /api/services/category/:category
```

### Admin Endpoints (Require JWT)

**Admin login:**
```
POST /api/admin/login
Body: { "email": "...", "password": "..." }
```

**Get all services:**
```
GET /api/admin/services
Headers: { "Authorization": "Bearer <token>" }
```

**Update service price:**
```
PUT /api/admin/services/:id/price
Headers: { "Authorization": "Bearer <token>" }
Body: { "priceSAR": "...", "priceGBP": "..." }
```

**Convert all prices:**
```
POST /api/admin/services/convert
Headers: { "Authorization": "Bearer <token>" }
Body: { "rate": 0.2, "direction": "SAR_TO_GBP" }
```

---

## 🌐 Plesk/Production Setup

### Environment Variables in Plesk

Go to: **Node.js > Custom environment variables**

Add these variables:
```
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:YOUR_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=generate-32-char-random-string
JWT_SECRET=generate-32-char-random-string
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
```

### Initialize Database on Server

SSH into your Plesk server:
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
npm run init-db
```

---

## 🔍 Troubleshooting

### "MongoNetworkError: failed to connect"
- Check your MongoDB password in `.env`
- Ensure MongoDB Atlas allows connections from your IP
- Verify the connection string format

### "Admin user already exists"
- This is normal if you run `init-db` multiple times
- The script skips existing admin users

### "Services already exist"
- The script only imports new services
- It skips services with existing IDs

### "JWT must be provided"
- Ensure you're sending the Authorization header
- Check token format: `Bearer <your-token>`

### "Invalid or expired token"
- Tokens expire after 24 hours
- Login again to get a new token

---

## 📝 File Structure

```
VitalServices/
├── server/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User model with password hashing
│   │   └── Service.js           # Service model
│   ├── routes/
│   │   ├── admin.js             # Admin routes (JWT protected)
│   │   ├── services.js          # Service routes (MongoDB)
│   │   └── contact.js           # Contact routes
│   ├── scripts/
│   │   └── initDatabase.js      # Database initialization
│   └── index.js                 # Server entry (connects to MongoDB)
├── .env                         # Environment variables (create this!)
├── .env.example                 # Environment template
└── MONGODB_SETUP.md             # This file
```

---

## ✅ Verification Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with MongoDB credentials
- [ ] Database initialized (`npm run init-db`)
- [ ] Server starts without errors
- [ ] Can login to admin panel
- [ ] Services load on main page
- [ ] Can update service prices from admin panel

---

## 🎯 Next Steps

1. **Change Admin Password** (in production):
   - Update `ADMIN_PASSWORD` in `.env`
   - Run `npm run init-db` again
   - Or update directly in MongoDB

2. **Generate Secure Keys**:
   ```bash
   # Generate SESSION_SECRET
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Generate JWT_SECRET
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Configure Email** (for contact form):
   - Set up Gmail App Password
   - Update EMAIL_* variables in `.env`

4. **Deploy to Production**:
   - Follow DEPLOYMENT_GUIDE.md
   - Set environment variables in Plesk
   - Run database initialization on server

---

## 📞 Support

For issues:
- Check server logs
- Verify MongoDB connection string
- Ensure all dependencies are installed
- Check environment variables

**Email:** vitalservices@vitalblaze.com

---

**🎉 MongoDB setup complete! Your project is now using a production-ready database.**

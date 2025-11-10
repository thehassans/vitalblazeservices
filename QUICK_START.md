# ⚡ Quick Start - VitalServices with MongoDB

## 🎯 **3-Step Setup**

### **Step 1: Create `.env` File**

Copy this EXACT content into a new file named `.env` in the root folder:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://vitalservices:vitalblazevitalservice@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority&appName=vitalservices
ADMIN_USERNAME=admin
ADMIN_PASSWORD=vitalservice975312468
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@vitalblaze.com
EMAIL_TO=info@vitalblaze.com
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000
SESSION_SECRET=vitalblaze-session-secret-key-2024
JWT_SECRET=vitalblaze-jwt-secret-key-2024
```

---

### **Step 2: Install & Seed**

```bash
# Install all dependencies
npm install

# Seed the database with services
npm run seed
```

**You should see:**
```
✅ Connected to MongoDB
✅ Successfully seeded 18 services
🎉 Database seeding completed successfully!
```

---

### **Step 3: Start the Application**

```bash
# Start both backend and frontend
npm run dev
```

**Access:**
- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **API:** http://localhost:5000/api/services

---

## 🔐 **Admin Login**

- **Email:** vitalservices@vitalblaze.com
- **Password:** vitalservice975312468

---

## ✅ **What's Changed**

| Component | Before | After |
|-----------|--------|-------|
| **Database** | In-memory array | ✅ MongoDB Atlas Cloud |
| **Data Persistence** | Lost on restart | ✅ Permanent storage |
| **Scalability** | Limited | ✅ Cloud-scale ready |
| **Admin Updates** | Temporary | ✅ Saved to database |

---

## 📊 **Your MongoDB Details**

- **Cluster:** vitalservices.hgqktr5.mongodb.net
- **Database:** vitalservices
- **Collection:** services
- **Username:** vitalservices
- **Dashboard:** https://cloud.mongodb.com

---

## 🚨 **Troubleshooting**

### Issue: "Cannot connect to MongoDB"
```bash
# Check if .env file exists
dir .env

# Verify MONGODB_URI is correct in .env
type .env
```

### Issue: "No services found"
```bash
# Re-run the seeder
npm run seed
```

### Issue: "Module not found: mongoose"
```bash
# Reinstall dependencies
npm install
```

---

## 🎉 **Success!**

If you see services on http://localhost:3000, you're all set!

Your data is now stored permanently in MongoDB Atlas. 🚀

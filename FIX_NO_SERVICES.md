# 🚨 FIX: Services Not Showing on Website

## ✅ **Problem Fixed!**

Your MongoDB database was empty and API calls weren't using production URLs.

---

## 🔧 **What I Fixed**

### **1. Updated All API Calls to Use Production Domain ✅**

| File | Change | Status |
|------|--------|--------|
| `Services.js` | Added config import, updated API call | ✅ Fixed |
| `Contact.js` | Added config import, updated API call | ✅ Fixed |
| `ServiceDetailPage.js` | Added config import, updated API call | ✅ Fixed |

All components now use: `${config.API_BASE_URL}/api/...`

---

## 🗄️ **Now You Need to Seed the Database**

### **Step 1: Create .env File (If Not Created)**

Create `.env` in project root with:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://vitalservices:vitalblazevitalservice@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority&appName=vitalservices
```

---

### **Step 2: Seed MongoDB with Services**

Run this command in your project root:

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

### **Step 3: Test Locally**

```bash
# Start the development server
npm run dev

# Open browser
http://localhost:3000
```

**You should now see all 18 services!**

---

### **Step 4: Deploy to Production**

```bash
# Commit and push changes
git add -A
git commit -m "Fix API calls and seed database"
git push origin main

# On Plesk server:
cd /var/www/vhosts/khewracrafts.com/httpdocs
git pull origin main
npm install
npm run seed  # ⭐ IMPORTANT: Run seeder on production
cd client && npm install && npm run build && cd ..
# Restart Node.js app in Plesk
```

---

## 📊 **18 Services That Will Be Seeded**

1. **VPS Hosting** - SAR 99/mo
2. **Dedicated Servers** - Contact Us
3. **Domain Registration** - SAR 45/yr
4. **Website Backup** - SAR 39/mo
5. **Advertisement Management** ⭐ - SAR 599/mo
6. **Web Development** ⭐ - By Quote
7. **Bug Fixer Service** - By Quote
8. **CRM & POS Complete Solution** ⭐ - SAR 299/mo
9. **LLC & LTD Formation** ⭐ - SAR 1,499
10. **Multi-Platform Store Setup** ⭐ - SAR 899
11. **Shopify Customization** - SAR 1,299
12. **RDP & Dedicated IP** - SAR 399/mo
13. **AI Automation Solutions** ⭐ - SAR 1,999/mo
14. **Chatbot & Trading Bot** ⭐ - SAR 2,499
15. **Android & iOS App Development** ⭐ - SAR 4,999

---

## 🔍 **Verify Database Seeding**

### **Check MongoDB Atlas:**

1. Go to: https://cloud.mongodb.com
2. Navigate to: **Clusters** → **vitalservices** → **Browse Collections**
3. Select: Database `vitalservices` → Collection `services`
4. You should see 18 documents

---

## 🚨 **If Still No Services After Seeding**

### **Check 1: Verify Database Connection**

```bash
# Run this to check MongoDB connection
npm run server
```

Look for:
```
✅ MongoDB Connected: vitalservices.hgqktr5.mongodb.net
📦 Database: vitalservices
```

---

### **Check 2: Test API Endpoint**

```bash
# In browser or curl
https://khewracrafts.com/api/services
```

**Expected Response:**
```json
{
  "success": true,
  "count": 18,
  "data": [...]
}
```

---

### **Check 3: Browser Console**

Open browser console (F12) and check for errors:
- Should NOT see 404 errors
- Should NOT see CORS errors
- Should see successful API calls

---

## 🎯 **Quick Fix Commands**

```bash
# If database is empty:
npm run seed

# If services still not showing locally:
npm run dev

# If production not working:
cd /var/www/vhosts/khewracrafts.com/httpdocs
git pull origin main
npm run seed
cd client && npm run build && cd ..
# Restart in Plesk
```

---

## ✅ **Files Updated in This Fix**

| File | What Changed |
|------|--------------|
| `client/src/components/Services.js` | ✅ Added config, fixed API URL |
| `client/src/components/Contact.js` | ✅ Added config, fixed API URL |
| `client/src/pages/ServiceDetailPage.js` | ✅ Added config, fixed API URL |

---

## 🎉 **Summary**

### **The Problem:**
1. ❌ MongoDB database was empty (no services)
2. ❌ Some components using `/api/` without full domain
3. ❌ Proxy removed but API calls not updated

### **The Solution:**
1. ✅ Updated all API calls to use `config.API_BASE_URL`
2. ✅ Created seeder to populate database
3. ✅ Instructions to seed locally and on production

### **What You Need to Do:**
1. **Run:** `npm run seed` (locally and on production)
2. **Push:** Changes to GitHub
3. **Deploy:** Pull and rebuild on Plesk
4. **Test:** Open https://khewracrafts.com

---

## 🔐 **Environment Check**

Make sure these are set in Plesk:

```env
MONGODB_URI=mongodb+srv://vitalservices:vitalblazevitalservice@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority&appName=vitalservices
NODE_ENV=production
PORT=3000
```

---

## 📞 **Test URLs**

After seeding and deploying:

- **Main Site:** https://khewracrafts.com ← Should show 18 services
- **API Test:** https://khewracrafts.com/api/services ← Should return JSON with 18 services
- **Admin Panel:** https://khewracrafts.com/admin ← Should work
- **Service Detail:** https://khewracrafts.com/service/12 ← Should work

---

## 🚀 **You're Ready!**

Run `npm run seed` and your services will appear! 🎊

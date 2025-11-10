# 🚀 Deploy to Production - khewracrafts.com

## ✅ **Complete Deployment Guide**

---

## 📋 **Pre-Deployment Checklist**

Before deploying, make sure:

- [x] MongoDB URI is correct
- [x] All API calls use production domain
- [x] Client uses config.js
- [x] No localhost references
- [x] Database seeded locally (tested)
- [x] Changes committed to GitHub

**All checked? Let's deploy! ✅**

---

## 🌐 **Step-by-Step Deployment**

### **Step 1: SSH into Plesk Server**

```bash
ssh your-username@khewracrafts.com
# Or use Plesk SSH terminal
```

---

### **Step 2: Navigate to Project Directory**

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
```

---

### **Step 3: Pull Latest Changes**

```bash
git pull origin main
```

**You should see:**
```
Updating 35ca28c..77c29f0
Fast-forward
 client/src/components/Contact.js       | 3 ++-
 client/src/components/Services.js      | 3 ++-
 client/src/pages/ServiceDetailPage.js  | 3 ++-
 FIX_NO_SERVICES.md                     | 252 +++++++++++++++++
 4 files changed, 258 insertions(+), 3 deletions(-)
```

---

### **Step 4: Install Dependencies**

```bash
npm install
cd client
npm install
cd ..
```

---

### **Step 5: 🎯 SEED THE DATABASE (CRITICAL!)**

```bash
npm run seed
```

**Expected Output:**
```
🌱 Starting database seeding...
✅ Connected to MongoDB: vitalservices.hgqktr5.mongodb.net
📦 Database: vitalservices
🗑️  Cleared existing services
✅ Successfully seeded 18 services

📊 Seeded Services:
   - VPS Hosting (ID: 3)
   - Dedicated Servers (ID: 4)
   - Domain Registration (ID: 5)
   - Website Backup (ID: 8)
   - Advertisement Management (ID: 9) ⭐
   - Web Development (ID: 10) ⭐
   - Bug Fixer Service (ID: 11)
   - CRM & POS Complete Solution (ID: 12) ⭐
   - LLC & LTD Formation (ID: 16) ⭐
   - Multi-Platform Store Setup (ID: 17) ⭐
   - Shopify Customization (ID: 18)
   - RDP & Dedicated IP (ID: 19)
   - AI Automation Solutions (ID: 20) ⭐
   - Chatbot & Trading Bot (ID: 21) ⭐
   - Android & iOS App Development (ID: 22) ⭐

🎉 Database seeding completed successfully!
```

**⚠️ IMPORTANT:** This step populates your database. Without it, no services will show!

---

### **Step 6: Build Client**

```bash
cd client
npm run build
cd ..
```

**This creates optimized production build in `client/build/`**

---

### **Step 7: Restart Node.js Application**

**Option A: Via Plesk Dashboard**
1. Go to: **Websites & Domains**
2. Click: **Node.js**
3. Click: **Restart App** button

**Option B: Via PM2 (if using)**
```bash
pm2 restart vitalservices
```

---

### **Step 8: Verify Environment Variables in Plesk**

Go to: **Plesk → Node.js → Custom Environment Variables**

Make sure these are set:

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

---

## ✅ **Testing After Deployment**

### **Test 1: Main Website**

Open: https://khewracrafts.com

**Expected:**
- ✅ Website loads
- ✅ All 18 services displayed
- ✅ Services organized by category
- ✅ Prices showing in SAR/GBP

---

### **Test 2: API Endpoint**

Open: https://khewracrafts.com/api/services

**Expected Response:**
```json
{
  "success": true,
  "count": 18,
  "data": [
    {
      "_id": "...",
      "id": 3,
      "category": "Hosting & Servers",
      "name": "VPS Hosting",
      "priceSAR": "99",
      "priceGBP": "20",
      "priceType": "mo",
      ...
    },
    ...
  ]
}
```

---

### **Test 3: Admin Panel**

Open: https://khewracrafts.com/admin

**Login with:**
- Email: `vitalservices@vitalblaze.com`
- Password: `vitalservice975312468`

**Expected:**
- ✅ Login successful
- ✅ Dashboard shows all 18 services
- ✅ Can update prices
- ✅ Currency conversion works

---

### **Test 4: Service Detail Page**

Open: https://khewracrafts.com/service/12

**Expected:**
- ✅ CRM & POS service details load
- ✅ All features displayed
- ✅ Pricing shown
- ✅ Configurator works (if applicable)

---

### **Test 5: Contact Form**

Open: https://khewracrafts.com/#contact

**Test:**
- Fill form and submit
- Should show success message
- Check email (if configured)

---

## 🔍 **Troubleshooting**

### **Issue: Services Still Not Showing**

**Solution:**
```bash
# Re-run seeder
cd /var/www/vhosts/khewracrafts.com/httpdocs
npm run seed

# Check database
# Go to MongoDB Atlas → Browse Collections
# Should see 18 documents in services collection
```

---

### **Issue: 502 Bad Gateway**

**Solution:**
```bash
# Check if Node.js app is running
pm2 list

# Or restart in Plesk
# Plesk → Node.js → Restart App
```

---

### **Issue: CORS Errors**

**Solution:**

Check `.env` or Plesk environment variables:
```env
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
```

---

### **Issue: MongoDB Connection Failed**

**Solution:**

1. **Check MongoDB Atlas Network Access:**
   - Go to: MongoDB Atlas → Network Access
   - Add IP: `0.0.0.0/0` (allow all)
   - Or add your Plesk server IP

2. **Verify URI:**
   ```env
   MONGODB_URI=mongodb+srv://vitalservices:vitalblazevitalservice@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority&appName=vitalservices
   ```

---

### **Issue: API Returns Empty Array**

**Solution:**

Database is empty. Run seeder:
```bash
npm run seed
```

---

## 🎯 **Complete Deployment Commands (Copy-Paste)**

```bash
# Navigate to project
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Pull latest code
git pull origin main

# Install dependencies
npm install
cd client && npm install && cd ..

# SEED DATABASE (CRITICAL!)
npm run seed

# Build client
cd client && npm run build && cd ..

# Restart app (in Plesk or via PM2)
pm2 restart vitalservices
# OR restart in Plesk dashboard
```

---

## 📊 **What Gets Deployed**

| Component | Files | Action |
|-----------|-------|--------|
| **Backend** | `server/` files | Pulled from GitHub |
| **Database** | MongoDB Atlas | Seeded with 18 services |
| **Frontend** | `client/build/` | Built from source |
| **Config** | Environment vars | Set in Plesk |
| **Node.js App** | Entry point | Restarted |

---

## 🔄 **Future Deployments**

For future updates:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
git pull origin main
npm install
cd client && npm install && npm run build && cd ..
pm2 restart vitalservices
```

**Note:** You only need to run `npm run seed` once unless you want to reset the database.

---

## 📞 **Access URLs After Deployment**

| Resource | URL |
|----------|-----|
| **Main Site** | https://khewracrafts.com |
| **Admin Panel** | https://khewracrafts.com/admin |
| **API Services** | https://khewracrafts.com/api/services |
| **API Service Detail** | https://khewracrafts.com/api/services/12 |
| **Contact API** | https://khewracrafts.com/api/contact |
| **MongoDB Dashboard** | https://cloud.mongodb.com |

---

## ✅ **Deployment Checklist**

After deployment, verify:

- [ ] Website loads without errors
- [ ] All 18 services visible
- [ ] Category filtering works
- [ ] Service detail pages work
- [ ] Admin panel accessible
- [ ] Admin can login
- [ ] Admin can update prices
- [ ] Currency conversion works
- [ ] Contact form submits
- [ ] No console errors in browser
- [ ] API endpoints return data
- [ ] MongoDB has 18 services

---

## 🎉 **Deployment Complete!**

Your VitalServices platform is now live on **khewracrafts.com** with:

✅ **18 Premium Services**  
✅ **MongoDB Cloud Database**  
✅ **Admin Management Panel**  
✅ **Multi-Currency Support**  
✅ **Production-Ready Architecture**  

**Congratulations! 🚀🎊**

---

## 📈 **Next Steps**

1. **Test Everything** - Go through all pages
2. **Configure Email** - Set up SMTP for contact form
3. **SSL Certificate** - Ensure HTTPS is working
4. **Backup Plan** - Set up MongoDB backups
5. **Monitoring** - Set up uptime monitoring

---

## 🆘 **Need Help?**

**Quick Checks:**
1. View server logs in Plesk
2. Check MongoDB Atlas metrics
3. Open browser console (F12)
4. Test API endpoints directly

**Common Files to Check:**
- `/var/www/vhosts/khewracrafts.com/httpdocs/server/index.js`
- Plesk → Node.js settings
- MongoDB Atlas → Network Access
- MongoDB Atlas → Database Access

---

**Your site is LIVE! 🌟**

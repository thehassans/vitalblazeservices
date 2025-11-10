# Fix Applied - Run These Commands on Your Server

The Service model has been updated to accept all priceType values ('mo', 'yr', null, etc.) and all category names.

---

## 🚀 Run These Commands in SSH:

### Step 1: Pull Latest Code
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
git pull origin main
```

### Step 2: Initialize Database
```bash
npm run init-db
```

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

### Step 3: Restart Application
```bash
touch tmp/restart.txt
```

Or restart via Plesk Node.js panel.

### Step 4: Refresh Website
Open: https://khewracrafts.com

**Services should now appear!**

---

## ✅ What Was Fixed:

1. **priceType field** - Now accepts:
   - `'mo'` (monthly)
   - `'yr'` (yearly)
   - `'month'`
   - `'year'`
   - `'one-time'`
   - `null` or empty

2. **category field** - Now accepts all categories:
   - Hosting & Servers
   - Domains & Security
   - Marketing & Media
   - Website & E-commerce
   - CRM & POS
   - Business Services
   - E-commerce
   - Infrastructure
   - AI & Automation
   - Mobile Development

---

## 📊 Services That Will Be Imported:

1. VPS Hosting
2. Dedicated Servers
3. Domain Registration
4. Website Backup
5. Advertisement Management
6. Web Development
7. Bug Fixer Service
8. **CRM & POS Complete Solution** ⭐
9. LLC & LTD Formation
10. Multi-Platform Store Setup (Amazon, eBay, Etsy, TikTok)
11. Shopify Customization
12. RDP & Dedicated IP
13. AI Automation Solutions
14. Chatbot & Trading Bot
15. Android & iOS App Development
16. And more...

---

## 🔍 Verify Services Loaded:

```bash
# Check API endpoint
curl http://localhost:3000/api/services

# Should return JSON with 20+ services
```

---

**Just run: `git pull origin main && npm run init-db && touch tmp/restart.txt`**

Then refresh your website!

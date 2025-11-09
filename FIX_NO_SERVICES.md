# Fix: No Services Showing on Main Page

The page is empty because MongoDB database hasn't been initialized with services yet.

---

## 🔧 **Quick Fix (3 Steps):**

### **Step 1: Verify .env File Exists**

SSH into your server and check:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
cat .env | grep MONGODB_URI
```

**You should see:**
```
MONGODB_URI=mongodb+srv://vitalservices:YOUR_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
```

**If the file doesn't exist, create it:**
```bash
cat > .env << 'EOF'
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:YOUR_MONGODB_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=vital-session-secret-2024
JWT_SECRET=vital-jwt-secret-2024
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
EOF

# Now edit and add your MongoDB password
nano .env
```

**Replace `YOUR_MONGODB_PASSWORD` with your actual password!**

---

### **Step 2: Initialize Database with Services**

Run the database initialization script:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
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

**This will import all 20+ services into MongoDB.**

---

### **Step 3: Restart Node.js Application**

**Option A: Via Plesk Panel**
1. Go to: https://khewracrafts.com:8443
2. Navigate to your domain
3. Click **Node.js**
4. Click **Restart** button

**Option B: Via SSH**
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
touch tmp/restart.txt
```

---

## 🔍 **Check if Services Were Imported:**

You can verify the services are in MongoDB by checking the logs:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
npm run init-db 2>&1 | grep "Services imported"
```

You should see: `✅ Services imported: 20` (or skipped if already imported)

---

## 📊 **What Gets Imported:**

The script imports these 20+ services:
- VPS Hosting
- Dedicated Servers
- Domain Registration
- Website Backup
- Advertisement Management
- Web Development
- Bug Fixer Service
- **CRM & POS Complete Solution** ⭐
- LLC & LTD Formation
- Multi-Platform Store Setup
- Shopify Customization
- RDP & Dedicated IP
- AI Automation Solutions
- Chatbot & Trading Bot
- Android & iOS App Development
- And more...

---

## ❌ **If Still Not Working:**

### Check API Response:
Open browser console (F12) on https://khewracrafts.com and look for errors.

Or test the API directly via SSH:
```bash
curl http://localhost:3000/api/services
```

**Expected Response:**
```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "id": 3,
      "name": "VPS Hosting",
      "category": "Hosting & Servers",
      ...
    },
    ...
  ]
}
```

### Check MongoDB Connection:
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ Connected')).catch(e => console.log('❌ Error:', e.message))"
```

### Check Server Logs:
```bash
# Check Plesk logs
tail -f /var/www/vhosts/khewracrafts.com/logs/error_log

# Or check Node.js specific logs in Plesk
```

---

## 🔐 **MongoDB Password Issue?**

If you're getting connection errors, your MongoDB password might have special characters.

**URL Encode Special Characters:**
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `^` → `%5E`
- `&` → `%26`

**Example:**
If password is `Pass@123#`, the URI should be:
```
mongodb+srv://vitalservices:Pass%40123%23@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
```

---

## ✅ **Success Checklist:**

After running `npm run init-db` successfully:

- [ ] See "✅ Connected to MongoDB"
- [ ] See "✅ Admin user created"
- [ ] See "✅ Services imported: 20"
- [ ] Restart Node.js app in Plesk
- [ ] Refresh https://khewracrafts.com
- [ ] Services should now appear!

---

## 🚀 **One-Line Fix:**

If your .env is correct, just run:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs && npm run init-db && touch tmp/restart.txt
```

Then refresh your website!

---

**The services are empty because MongoDB database is empty. Run `npm run init-db` to populate it!**

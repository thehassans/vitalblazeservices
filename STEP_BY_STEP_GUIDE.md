# Step-by-Step Guide: Get Your Services Showing on Website

Follow these exact steps in order.

---

## ✅ **Current Status:**
- Database: Connected ✅
- Services in DB: 15 ✅
- Server Running: NO ❌
- **Goal: Start the server so services appear on website**

---

# 🎯 **STEP 1: Login to Plesk**

1. Open your browser
2. Go to: **https://khewracrafts.com:8443**
3. Enter your Plesk username and password
4. Click **Log In**

---

# 🎯 **STEP 2: Navigate to Node.js Settings**

1. After logging in, you'll see your domain list
2. Click on **khewracrafts.com** (your domain)
3. On the left sidebar, look for **Node.js** (it has a green hexagon icon)
4. Click **Node.js**

---

# 🎯 **STEP 3: Configure Node.js Settings**

You'll see a Node.js configuration page. Set these fields:

### **A. Application Mode:**
- Select: **Production**

### **B. Node.js Version:**
- Select: **18.x** or higher (latest available)

### **C. Document Root:**
- Should show: `/httpdocs`
- If empty, type: `/httpdocs`

### **D. Application Startup File:**
- Type: **server/index.js**
- (This is VERY important!)

### **E. Application URL:**
- Leave as default or type: **https://khewracrafts.com**

---

# 🎯 **STEP 4: Add Environment Variables**

Still on the Node.js configuration page:

1. Scroll down to **Custom environment variables**
2. Click **[specify]** or **+ Add Variable**
3. Add these variables **one by one**:

### Variable 1:
```
Name: PORT
Value: 3000
```

### Variable 2:
```
Name: NODE_ENV
Value: production
```

### Variable 3:
```
Name: MONGODB_URI
Value: mongodb+srv://vitalservices:YOUR_MONGODB_PASSWORD_HERE@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
```
**⚠️ IMPORTANT:** Replace `YOUR_MONGODB_PASSWORD_HERE` with your actual MongoDB password!

### Variable 4:
```
Name: ADMIN_EMAIL
Value: vitalservices@vitalblaze.com
```

### Variable 5:
```
Name: ADMIN_PASSWORD
Value: vitalservice975312468
```

### Variable 6:
```
Name: SESSION_SECRET
Value: vital-plesk-session-secret-2024
```

### Variable 7:
```
Name: JWT_SECRET
Value: vital-plesk-jwt-secret-2024
```

### Variable 8:
```
Name: CLIENT_URL
Value: https://khewracrafts.com
```

### Variable 9:
```
Name: ALLOWED_ORIGINS
Value: https://khewracrafts.com,https://www.khewracrafts.com
```

---

# 🎯 **STEP 5: Enable Node.js**

1. After adding all environment variables
2. Click **OK** or **Apply** (if there's a button)
3. Look for a button that says **Enable Node.js** or **Enable**
4. Click it
5. Wait for confirmation message

---

# 🎯 **STEP 6: Restart the Application**

1. Still on the Node.js page
2. Look for a **Restart** button
3. Click **Restart**
4. Wait for the message: "Application restarted successfully" or similar
5. **Wait 20-30 seconds** for the server to fully start

---

# 🎯 **STEP 7: Test the Server via SSH**

1. Open SSH terminal (you already have this open)
2. Run this command:

```bash
curl http://localhost:3000/api/services | jq '.count'
```

**Expected result:** `15`

**If you see `15`**, the server is running! ✅

**If you see an error**, proceed to Step 8.

---

# 🎯 **STEP 8: Check Your Website**

1. Open a **new browser tab**
2. Go to: **https://khewracrafts.com**
3. Scroll down to the **"Comprehensive Solutions"** section
4. **You should now see all services!**

### You should see services like:
- VPS Hosting
- Dedicated Servers
- Domain Registration
- CRM & POS Complete Solution
- Web Development
- And more...

---

# ✅ **Success Checklist:**

- [ ] Logged into Plesk
- [ ] Opened Node.js settings
- [ ] Set Application startup file: `server/index.js`
- [ ] Added all 9 environment variables
- [ ] Enabled Node.js
- [ ] Restarted application
- [ ] Tested API: `curl http://localhost:3000/api/services`
- [ ] Refreshed website: https://khewracrafts.com
- [ ] Services now showing on website ✅

---

# 🔧 **Troubleshooting:**

## Problem 1: "Enable Node.js" button is grayed out

**Solution:**
- Make sure all required fields are filled
- Application startup file must be: `server/index.js`
- Document root must be: `/httpdocs`

## Problem 2: Server restarts but API still doesn't respond

**Solution via SSH:**
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
touch tmp/restart.txt
sleep 10
curl http://localhost:3000/api/services | jq '.count'
```

## Problem 3: Can't find Node.js in Plesk sidebar

**Solution:**
- Make sure you're in the domain view (not server view)
- Click your domain first
- Then look for Node.js in left sidebar
- If still not visible, Node.js might need to be enabled by your hosting provider

## Problem 4: Environment variables not saving

**Solution:**
- Click each variable individually
- Make sure to click Save/Apply after each one
- Or add all at once in the text box format:
```
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
```

---

# 🎯 **Quick Reference Commands (SSH):**

### Test if server is responding:
```bash
curl http://localhost:3000/api/services | head -20
```

### Check if Node.js process is running:
```bash
ps aux | grep "server/index.js" | grep -v grep
```

### Manual restart (if Plesk restart doesn't work):
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
touch tmp/restart.txt
```

### Check server logs:
```bash
tail -50 /var/www/vhosts/khewracrafts.com/logs/error_log
```

---

# 📸 **What You're Looking For in Plesk:**

## Node.js Configuration Page Should Show:

```
✅ Application mode: Production
✅ Node.js version: 18.x (or higher)
✅ Document root: /httpdocs
✅ Application startup file: server/index.js
✅ Custom environment variables: 9 variables added
✅ Status: Enabled and Running
```

---

# 🚀 **After Completing All Steps:**

1. **API Test:** `curl http://localhost:3000/api/services` → Should return JSON with 15 services
2. **Website Test:** https://khewracrafts.com → Services should appear
3. **Admin Test:** https://khewracrafts.com/admin → Login should work

---

# 📞 **Need Help?**

If after following all steps, services still don't appear:

### Run this diagnostic in SSH:
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

echo "=== Testing Server ==="
curl -s http://localhost:3000/api/services | jq '{success, count, data: .data | length}'

echo -e "\n=== Checking Process ==="
ps aux | grep "node" | grep -v grep

echo -e "\n=== Checking Logs ==="
tail -20 /var/www/vhosts/khewracrafts.com/logs/error_log
```

**Copy the output and we can debug from there.**

---

**🎯 Start with STEP 1 and follow each step in order. Good luck!** 🚀

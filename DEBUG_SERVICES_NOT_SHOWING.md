# Debug: Services in Database But Not Showing on Website

The database has 15 services, but they're not appearing on the website. This is a frontend/API connection issue.

---

## 🔍 **Quick Diagnosis:**

Run these commands in SSH to find the issue:

### 1. Test API Endpoint
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
curl -i http://localhost:3000/api/services
```

**Expected Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "count": 15,
  "data": [...]
}
```

**If you get an error or no response, the Node.js app isn't running.**

---

### 2. Check if Node.js App is Running
```bash
ps aux | grep node
```

**Expected:** Should show `node server/index.js` or similar

**If not running:**
- Go to Plesk → Node.js
- Click **Enable** or **Restart**

---

### 3. Check Server Logs
```bash
tail -50 /var/www/vhosts/khewracrafts.com/logs/error_log
```

Look for errors related to MongoDB or API calls.

---

### 4. Test from Browser
Open browser developer tools (F12) on https://khewracrafts.com

**Console Tab:** Look for errors like:
- `Failed to fetch`
- `CORS error`
- `Network error`

**Network Tab:** 
- Find the request to `/api/services`
- Check if it returns 200 OK with data
- Check the response body

---

## 🔧 **Common Fixes:**

### Fix 1: Restart Node.js App (Plesk)

1. Go to: https://khewracrafts.com:8443
2. Navigate to your domain
3. Click **Node.js**
4. Click **Restart** button
5. Wait 10 seconds
6. Refresh your website

---

### Fix 2: Check API URL in Frontend

The frontend might be pointing to wrong API URL.

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
grep -r "localhost:5000" client/build/
```

**If you find "localhost:5000"**, the frontend is pointing to development URL instead of production.

**Solution:** Rebuild the client with production API URL.

---

### Fix 3: Update Client API Configuration

Check if there's an API configuration file:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
cat client/src/config/api.js 2>/dev/null || echo "No config file"
```

**If it exists**, make sure it uses the correct production URL.

---

### Fix 4: CORS Issue

If you see CORS errors in browser console:

**Check server/index.js CORS settings:**
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
grep -A5 "cors" server/index.js
```

**Should allow your domain:**
```javascript
app.use(cors({
  origin: isProduction ? allowedOrigins : '*',
  credentials: true
}));
```

---

### Fix 5: Rebuild React Client

The built client might be using old API URLs:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
cd client
npm run build
cd ..
```

**Then restart:**
```bash
touch tmp/restart.txt
```

Or via Plesk → Node.js → Restart

---

## 🎯 **Most Likely Solution:**

The Node.js app probably needs to be restarted properly via Plesk:

### Method 1: Via Plesk Panel
1. Login to Plesk: https://khewracrafts.com:8443
2. Click on your domain
3. Click **Node.js** in the left menu
4. Click the **Restart** button
5. Wait for confirmation
6. Refresh your website

### Method 2: Via SSH with Passenger
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
touch tmp/restart.txt
# Wait 5 seconds
sleep 5
# Test API
curl http://localhost:3000/api/services | jq '.count'
```

---

## 🧪 **Complete Diagnostic Script:**

Run this to get full diagnostics:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

echo "=== 1. Checking Node.js Process ==="
ps aux | grep -i node | grep -v grep || echo "❌ Node.js not running"

echo -e "\n=== 2. Testing API Locally ==="
curl -s http://localhost:3000/api/services | jq '{success, count}' 2>/dev/null || echo "❌ API not responding"

echo -e "\n=== 3. Testing API from Domain ==="
curl -s https://khewracrafts.com/api/services | jq '{success, count}' 2>/dev/null || echo "❌ API not accessible from domain"

echo -e "\n=== 4. Checking MongoDB Connection ==="
grep -o "MongoDB Connected" logs/error_log 2>/dev/null | tail -1 || echo "Check logs manually"

echo -e "\n=== 5. Services in Database ==="
node -e "require('dotenv').config(); const mongoose = require('mongoose'); const Service = require('./server/models/Service'); mongoose.connect(process.env.MONGODB_URI).then(async () => { console.log('Count:', await Service.countDocuments()); process.exit(); });"

echo -e "\n=== 6. Checking .env File ==="
cat .env | grep -E "(PORT|MONGODB_URI|NODE_ENV)" | sed 's/:[^@]*@/:***@/g'

echo -e "\n✅ Diagnostic complete"
```

---

## 🔴 **If API Returns Data But Website Still Doesn't Show:**

The issue is in the React frontend.

**Check browser console (F12):**
```
1. Open https://khewracrafts.com
2. Press F12
3. Go to Console tab
4. Look for errors
5. Go to Network tab
6. Refresh page
7. Find request to /api/services
8. Check if it returns 200 with data
```

**If no request to /api/services is made:**
- The frontend code has an issue
- Check client/src/components/Services.js

**If request fails (404, 500, CORS):**
- API endpoint issue
- Check server/routes/services.js

---

## 💡 **Quick Fixes Summary:**

1. **Restart Node.js via Plesk** (most common fix)
2. Test API: `curl http://localhost:3000/api/services`
3. Check browser console for errors
4. Verify API returns data: Should show `"count": 15`
5. If needed, rebuild client: `cd client && npm run build`

---

## 🎯 **Expected Working State:**

### API Test:
```bash
curl http://localhost:3000/api/services
```

**Should return:**
```json
{
  "success": true,
  "count": 15,
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

### Website:
- Open https://khewracrafts.com
- Scroll to "Comprehensive Solutions" section
- Should see 15 service cards
- Currency toggle works (SAR/GBP)
- Filter buttons work (All, categories)

---

**First step: Go to Plesk → Node.js → Click Restart, then refresh your website!**

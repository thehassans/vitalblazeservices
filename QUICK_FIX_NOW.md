# Quick Fix - Services Not Showing

Let's diagnose and fix this step by step.

---

## 🔍 **Step 1: Check if Server is Running**

Run this in SSH:

```bash
curl http://localhost:3000/api/services | head -30
```

**What you should see:**
```json
{"success":true,"count":15,"data":[{...}]}
```

**If you see this** → Server is working ✅  
**If you see "Connection refused"** → Server stopped, restart it ❌

---

## 🔍 **Step 2: Test API from Your Domain**

```bash
curl https://khewracrafts.com/api/services | head -30
```

**What you should see:**
```json
{"success":true,"count":15,"data":[{...}]}
```

**If you see this** → API is accessible ✅  
**If you see "Connection refused" or error** → Server config issue ❌

---

## 🔧 **Step 3: Check Server Status**

```bash
ps aux | grep "server/index.js" | grep -v grep
```

**Expected:** Should show `node server/index.js` running

**If NOT showing** → Restart server:
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
node server/index.js
```

---

## 🔧 **Step 4: Pull Latest Code and Rebuild**

Run these commands **one by one**:

```bash
# Navigate to project
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Pull latest code
git pull origin main

# Go to client folder
cd client

# Build the client
npm run build

# Go back
cd ..
```

**Watch for "Compiled successfully!" message**

---

## 🔧 **Step 5: Check Build Files**

```bash
ls -la /var/www/vhosts/khewracrafts.com/httpdocs/client/build/static/js/ | head -10
```

**Expected:** Should show .js files with recent timestamps

---

## 🌐 **Step 6: Clear Browser Cache**

1. Open https://khewracrafts.com
2. Press **Ctrl+Shift+R** (hard refresh)
3. Or press **Ctrl+F5**
4. Or open in **Incognito/Private window**

---

## 🧪 **Step 7: Check Browser Console**

1. Open https://khewracrafts.com
2. Press **F12**
3. Go to **Console** tab
4. Look for errors (red text)

**Common errors:**
- `Failed to fetch` → API not responding
- `CORS error` → CORS configuration issue
- `404 Not Found` → Server not serving API

**Also check Network tab:**
- Find request to `/api/services`
- Check status code (should be 200)
- Check response (should have data)

---

## 💡 **If API Works But Website Doesn't Show Services:**

### Option A: Rebuild and Restart Everything

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Stop server if running (Ctrl+C in server terminal)
# Or kill process
ps aux | grep "server/index.js" | grep -v grep
# Note the PID, then: kill PID_NUMBER

# Pull code
git pull origin main

# Rebuild client
cd client
npm run build
cd ..

# Start server
nohup node server/index.js > server.log 2>&1 &

# Check logs
tail -f server.log
```

---

### Option B: Use PM2 (Recommended)

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Install PM2 if not installed
npm install -g pm2

# Pull latest code
git pull origin main

# Rebuild client
cd client
npm run build
cd ..

# Start with PM2
pm2 start server/index.js --name vitalblaze

# Save config
pm2 save

# Check status
pm2 status

# View logs
pm2 logs vitalblaze --lines 50
```

---

## 🎯 **Complete Fix Command (All in One):**

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs && \
git pull origin main && \
cd client && \
npm run build && \
cd .. && \
pkill -f "server/index.js" && \
sleep 2 && \
nohup node server/index.js > server.log 2>&1 & && \
sleep 5 && \
curl http://localhost:3000/api/services | jq '.count' && \
echo "✅ Done! Now refresh your website with Ctrl+Shift+R"
```

---

## 🔍 **Diagnostic Full Check:**

Run this to see everything:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

echo "=== 1. Check server process ==="
ps aux | grep "server/index.js" | grep -v grep

echo -e "\n=== 2. Test local API ==="
curl -s http://localhost:3000/api/services | jq '{success, count}'

echo -e "\n=== 3. Test domain API ==="
curl -s https://khewracrafts.com/api/services | jq '{success, count}'

echo -e "\n=== 4. Check client build folder ==="
ls -lh client/build/index.html 2>/dev/null || echo "❌ Build not found"

echo -e "\n=== 5. Check recent build ==="
ls -lt client/build/static/js/*.js 2>/dev/null | head -3

echo -e "\n=== 6. Check server logs ==="
tail -20 server.log 2>/dev/null || echo "No server.log found"

echo -e "\n✅ Diagnostic complete"
```

---

## 📊 **Expected Working State:**

### Server:
```
✅ Process running: node server/index.js
✅ API responds: http://localhost:3000/api/services
✅ Returns: {"success":true,"count":15,...}
```

### Client:
```
✅ Build folder exists: client/build/
✅ Recent build files
✅ index.html exists
```

### Website:
```
✅ https://khewracrafts.com loads
✅ API call in browser: /api/services returns data
✅ Services appear in "Comprehensive Solutions" section
```

---

## 🚨 **Most Common Issues:**

| Issue | Solution |
|-------|----------|
| Server not running | `node server/index.js` |
| Old build being served | `cd client && npm run build` |
| Browser cache | Hard refresh: Ctrl+Shift+R |
| Wrong API URL | Already fixed in code, need to rebuild |
| Port 3000 not accessible | Check firewall/Plesk config |

---

## 🎯 **Quick Steps Right Now:**

1. **Run this:**
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
git pull origin main
cd client
npm run build
```

2. **Make sure server is running:**
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
ps aux | grep "server/index.js" | grep -v grep
```

3. **If not running, start it:**
```bash
node server/index.js
```

4. **Open website and hard refresh:** Ctrl+Shift+R

---

**Run the diagnostic command above and share the output!** 📊

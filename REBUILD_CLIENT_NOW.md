# Rebuild Client - Fix Services Not Showing

The API URLs have been fixed in the code. Now you need to rebuild the React client on your server.

---

## 🎯 **What Was Fixed:**

✅ Created `client/src/config/api.js` - Dynamic API URL configuration  
✅ Fixed `Services.js` - Now uses correct API URL  
✅ Fixed `AdminLogin.js` - Now uses correct API URL  
✅ Fixed `AdminDashboard.js` - All API calls updated  
✅ Fixed `AdminCurrency.js` - All API calls updated  
✅ Fixed `client/package.json` - Proxy set to port 3000  

**Before:** Hardcoded `http://localhost:5000/api/...`  
**After:** Dynamic `${API_BASE_URL}/api/...` (uses window.location.origin in production)

---

## 🚀 **Run These Commands on Your Server:**

### Step 1: Pull Latest Code
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
git pull origin main
```

### Step 2: Install Dependencies (if needed)
```bash
cd client
npm install
```

### Step 3: Build the Client
```bash
npm run build
```

**This will take 1-2 minutes. Wait for it to complete.**

### Step 4: Go Back to Root
```bash
cd ..
```

### Step 5: Restart Server (if it stopped)
```bash
node server/index.js
```

Or if using PM2:
```bash
pm2 restart vitalblaze
```

Or if using nohup:
```bash
nohup node server/index.js > server.log 2>&1 &
```

---

## ✅ **Expected Output During Build:**

```
Creating an optimized production build...
Compiled successfully!

File sizes after gzip:

  XX.XX kB  build/static/js/main.xxxxxxxx.js
  XX.XX kB  build/static/css/main.xxxxxxxx.css

The build folder is ready to be deployed.
```

---

## 🧪 **Test After Rebuild:**

### 1. Check if build folder exists:
```bash
ls -la /var/www/vhosts/khewracrafts.com/httpdocs/client/build/
```

### 2. Test API from browser console:
Open https://khewracrafts.com, press F12, and run:
```javascript
fetch('/api/services').then(r => r.json()).then(console.log)
```

**Should return:** `{success: true, count: 15, data: [...]}`

### 3. Check website:
- Open: https://khewracrafts.com
- Scroll to "Comprehensive Solutions"
- **Services should now appear!** 🎉

---

## 📋 **Complete Command Sequence:**

Copy and paste this entire block:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs && \
git pull origin main && \
cd client && \
npm install && \
npm run build && \
cd .. && \
echo "✅ Client rebuilt successfully!"
```

**Then check your website!**

---

## 🔧 **If Server Stopped During Rebuild:**

The server might have stopped. Start it again:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
node server/index.js
```

**Keep the terminal open or use PM2/nohup to run in background.**

---

## 🎯 **Quick Summary:**

| Step | Command | Status |
|------|---------|--------|
| 1. Pull code | `git pull origin main` | ⏳ |
| 2. Install deps | `cd client && npm install` | ⏳ |
| 3. Build client | `npm run build` | ⏳ |
| 4. Start server | `node server/index.js` | ⏳ |
| 5. Check website | https://khewracrafts.com | ⏳ |

---

## ✅ **Success Indicators:**

- [ ] Git pull completes without errors
- [ ] npm install completes without errors
- [ ] npm run build shows "Compiled successfully!"
- [ ] `client/build` folder exists with files
- [ ] Server is running (check with `ps aux | grep "server/index.js"`)
- [ ] curl http://localhost:3000/api/services returns JSON
- [ ] Website shows services! 🎉

---

## 🆘 **If Build Fails:**

### Error: "npm: command not found"
**Solution:** Install Node.js and npm
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Error: "Out of memory"
**Solution:** Increase memory limit
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Error: "Module not found"
**Solution:** Clean install
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs/client
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🎉 **After Successful Rebuild:**

1. **Services will appear on website**
2. **Admin panel will work**
3. **All API calls will use correct URLs**
4. **No more localhost:5000 errors**

---

**Run the commands now and your services will appear!** 🚀✨

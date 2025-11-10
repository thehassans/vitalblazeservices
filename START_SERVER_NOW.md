# Start Node.js Server - The server is NOT running

Your database has 15 services, but the Node.js server isn't running.

---

## 🚀 **Option 1: Start Server via Plesk (Recommended)**

### Go to Plesk and configure:

1. Login: **https://khewracrafts.com:8443**
2. Click your domain
3. Click **Node.js** in left sidebar
4. Configure these settings:

**Required Settings:**
```
✅ Application mode: Production
✅ Node.js version: 18.x or higher
✅ Document root: /httpdocs
✅ Application startup file: server/index.js
✅ Environment variables: Click [specify]
```

**Environment Variables (Click [specify] and add):**
```
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:YOUR_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=vital-session-2024
JWT_SECRET=vital-jwt-2024
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
```

5. Click **Enable Node.js** (if not enabled)
6. Click **Restart**

---

## 🚀 **Option 2: Start Server via SSH (Quick Test)**

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Start server in foreground to see errors
node server/index.js
```

**Expected Output:**
```
🚀 VitalBlaze Services Server Started
==================================================
📦 Environment: production
🌐 Port: 3000
🔗 Local: http://localhost:3000
🌍 CORS Origins: https://khewracrafts.com
==================================================
```

**If you see errors, they'll show why the server won't start.**

**To stop:** Press `Ctrl+C`

---

## 🔍 **Check Why Server Won't Start**

### 1. Check for errors when starting:
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
node server/index.js 2>&1 | head -50
```

**Common errors you might see:**

#### Error: "Cannot find module"
**Solution:** Install dependencies
```bash
npm install
```

#### Error: "Port 3000 already in use"
**Solution:** Check what's using port 3000
```bash
netstat -tulpn | grep :3000
# or
lsof -i :3000
```

#### Error: "MONGODB_URI is undefined"
**Solution:** .env file missing or not loaded
```bash
cat .env | grep MONGODB_URI
```

#### Error: "Cannot connect to MongoDB"
**Solution:** Check MongoDB password in .env

---

## 🧪 **Verify Server Started:**

```bash
# In another terminal or after server starts
curl http://localhost:3000/api/health

# Should return:
# {"status":"ok","message":"VitalBlaze Services API is running",...}
```

---

## 🎯 **Complete Server Start Commands:**

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Install dependencies (if needed)
npm install

# Start server in foreground (see output)
node server/index.js
```

**Keep this terminal open. Server must stay running.**

---

## 🔄 **Option 3: Use Process Manager (PM2)**

If you want the server to run in background and auto-restart:

```bash
# Install PM2 globally
npm install -g pm2

cd /var/www/vhosts/khewracrafts.com/httpdocs

# Start server with PM2
pm2 start server/index.js --name vitalblaze

# Save PM2 config
pm2 save

# Setup auto-start on reboot
pm2 startup

# Check status
pm2 status

# View logs
pm2 logs vitalblaze
```

**PM2 Commands:**
```bash
pm2 status          # Check if running
pm2 restart vitalblaze   # Restart server
pm2 stop vitalblaze      # Stop server
pm2 logs vitalblaze      # View logs
pm2 delete vitalblaze    # Remove from PM2
```

---

## 📝 **Plesk Node.js Passenger Setup**

Plesk uses Passenger to run Node.js apps. For it to work:

### Required File: `app.js` or Configure Startup File

**Option A: Use server/index.js directly**
- Set "Application startup file" to `server/index.js` in Plesk

**Option B: Create app.js wrapper** (if Plesk requires it)

Create `/var/www/vhosts/khewracrafts.com/httpdocs/app.js`:

```bash
cat > app.js << 'EOF'
// Passenger/Plesk entry point
require('./server/index.js');
EOF
```

Then set "Application startup file" to `app.js` in Plesk.

---

## 🧪 **Debug Checklist:**

Run these commands and check results:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

echo "=== 1. Check .env file exists ==="
ls -la .env

echo -e "\n=== 2. Check Node.js installed ==="
node --version
npm --version

echo -e "\n=== 3. Check dependencies installed ==="
ls -la node_modules | head -5

echo -e "\n=== 4. Try starting server ==="
timeout 5 node server/index.js 2>&1 || true

echo -e "\n=== 5. Check if port 3000 is available ==="
netstat -tulpn 2>/dev/null | grep :3000 || echo "Port 3000 is free"

echo -e "\n=== 6. Check Plesk Passenger temp directory ==="
ls -la tmp/

echo -e "\n✅ Debug complete"
```

---

## 🎯 **Expected Working State:**

### After starting server successfully:

```bash
ps aux | grep "node server/index.js"
```

**Should show:** `node server/index.js` (NOT just grep)

### Test API:
```bash
curl http://localhost:3000/api/services | jq '.count'
```

**Should return:** `15`

### Website:
- Open https://khewracrafts.com
- Services should appear

---

## 🚨 **Most Common Issues:**

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Change PORT in .env or stop conflicting service |
| Dependencies missing | Run `npm install` |
| .env not found | Create .env file with MongoDB URI |
| MongoDB connection fails | Check password in MONGODB_URI |
| Plesk not configured | Set Application startup file to `server/index.js` |

---

## 💡 **Quick Start (Fastest Method):**

### For Quick Testing:
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
npm install
node server/index.js
```

### For Production (Use Plesk):
1. Plesk → Node.js
2. Set startup file: `server/index.js`
3. Add environment variables
4. Enable and Restart

---

**The server MUST be running for the website to show services. Start it via Plesk or manually in SSH!** 🚀

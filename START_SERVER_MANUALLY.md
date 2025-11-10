# Start Server Manually - Quick Fix

The server isn't running. Let's start it manually to see if there are any errors.

---

## 🚀 **Run These Commands Now:**

### Step 1: Navigate to your project
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
```

### Step 2: Check if dependencies are installed
```bash
ls node_modules/ | head -10
```

**If you see many folders (express, mongoose, etc.):** Dependencies installed ✅  
**If folder is empty or doesn't exist:** Run `npm install` first

### Step 3: Start the server
```bash
node server/index.js
```

---

## 📊 **What You Should See:**

### If it works:
```
✅ MongoDB Connected: vitalservices.hgqktr5.mongodb.net
📊 Database: vitalservices
🟢 Mongoose connected to MongoDB
==================================================
🚀 VitalBlaze Services Server Started
==================================================
📦 Environment: production
🌐 Port: 3000
🔗 Local: http://localhost:3000
==================================================
```

**If you see this, SUCCESS!** The server is now running.

**KEEP THIS TERMINAL OPEN** - Don't close it or press Ctrl+C

---

## ❌ **If You See Errors:**

### Error 1: "Cannot find module 'express'" or similar
**Solution:** Install dependencies
```bash
npm install
```
Then try `node server/index.js` again

---

### Error 2: "MONGODB_URI is undefined"
**Solution:** Create .env file
```bash
cat > .env << 'EOF'
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:YOUR_PASSWORD_HERE@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=vital-session-2024
JWT_SECRET=vital-jwt-2024
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
EOF

# Now edit to add your MongoDB password
nano .env
```
- Replace `YOUR_PASSWORD_HERE` with your actual MongoDB password
- Press `Ctrl+X`, then `Y`, then `Enter`
- Try `node server/index.js` again

---

### Error 3: "Port 3000 is already in use"
**Solution:** Check what's using port 3000
```bash
lsof -i :3000
# or
netstat -tulpn | grep :3000
```

**Kill the process:**
```bash
# Find the PID from above command, then:
kill -9 PID_NUMBER
```

Or use a different port:
```bash
PORT=3001 node server/index.js
```

---

### Error 4: MongoDB connection error
**Solution:** Check your MongoDB password

Your connection string is:
```
mongodb+srv://vitalservices:PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices
```

Make sure:
1. Password is correct
2. No special characters need URL encoding
3. MongoDB Atlas allows connections from your server IP

---

## ✅ **After Server Starts Successfully:**

### Open a NEW terminal (keep the server running in the first one)

**Terminal 2 - Test the API:**
```bash
curl http://localhost:3000/api/services | jq '.count'
```

**Expected:** `15`

---

## 🌐 **Test Your Website:**

1. Open browser
2. Go to: **https://khewracrafts.com**
3. Scroll to services section
4. Services should appear! 🎉

---

## 🔄 **To Keep Server Running Permanently:**

Once you confirm the server works manually, you have 2 options:

### Option A: Run in background with nohup
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
nohup node server/index.js > server.log 2>&1 &
```

**Check logs:**
```bash
tail -f server.log
```

**Stop server:**
```bash
ps aux | grep "server/index.js" | grep -v grep
# Note the PID, then:
kill PID_NUMBER
```

---

### Option B: Use PM2 (Better)
```bash
# Install PM2
npm install -g pm2

cd /var/www/vhosts/khewracrafts.com/httpdocs

# Start server
pm2 start server/index.js --name vitalblaze

# Save config
pm2 save

# Auto-start on server reboot
pm2 startup
# Copy and run the command it shows

# Check status
pm2 status

# View logs
pm2 logs vitalblaze
```

**PM2 Commands:**
```bash
pm2 status              # Check if running
pm2 restart vitalblaze  # Restart
pm2 stop vitalblaze     # Stop
pm2 logs vitalblaze     # View logs
pm2 delete vitalblaze   # Remove
```

---

### Option C: Configure Plesk (Preferred for production)
Follow the STEP_BY_STEP_GUIDE.md to configure Node.js in Plesk properly.

---

## 🎯 **COPY-PASTE QUICK START:**

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
node server/index.js
```

**That's it! The server should start.**

---

## 📝 **Summary:**

1. **Run:** `cd /var/www/vhosts/khewracrafts.com/httpdocs`
2. **Run:** `node server/index.js`
3. **Wait for startup messages**
4. **Test:** Open new terminal, run `curl http://localhost:3000/api/services`
5. **Check website:** https://khewracrafts.com

---

**Try running `node server/index.js` now and tell me what you see!** 🚀

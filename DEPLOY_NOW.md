# 🚀 Deploy VitalBlaze to Plesk - 3 Simple Steps

## Your site is showing "Not Found" because files aren't uploaded yet. Follow these 3 steps:

---

## **STEP 1: Upload Files Using Git** ⬆️

1. Login to Plesk: https://portal.vitalblaze.com
2. Go to: **Websites & Domains** → **khewracrafts.com**
3. Click: **Git** (in left sidebar)
4. Click: **"Add Repository"** button
5. Enter:
   - **Repository URL:** `https://github.com/thehassans/vitalblazeservices.git`
   - **Branch:** `main`
   - **Repository path:** `/httpdocs`
6. Click: **"OK"**
7. Click: **"Pull Updates"** button
8. Wait 30 seconds for files to download

✅ **Files are now on your server!**

---

## **STEP 2: Install Dependencies** 📦

1. Go to: **Node.js** section (in left sidebar)
2. Click: **"NPM Install"** button  
3. Wait 1-2 minutes
4. You'll see "Installation complete" message

✅ **Dependencies installed!**

---

## **STEP 3: Restart Application** 🔄

1. Still in Node.js section
2. Click: **"Restart App"** button
3. Wait 10 seconds
4. Visit: **https://khewracrafts.com**

✅ **Your site should now be live!**

---

## **What You'll See:**

### If React isn't built yet:
You'll see a **"Server Status"** page showing:
- ✅ Server is running
- ⚠️ React build not found
- Instructions to build it

### To fix this (via SSH):
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs/client
npm install
npm run build
```

Then restart the app in Plesk.

### When everything is working:
You'll see your full **VitalBlaze website** with:
- Hero section
- Services (in English/Arabic)
- Contact form
- Admin panel at `/admin`

---

## **Troubleshooting:**

### Files still not uploading?
**Try manual upload:**
1. Zip your project folder (exclude `node_modules`)
2. Go to: **Files** → **File Manager**
3. Upload ZIP to `/httpdocs`
4. Extract it
5. Continue from Step 2

### Node.js settings wrong?
**Check these in Plesk Node.js section:**
- Document Root: `/httpdocs`  
- Application Startup File: `app.js`
- Application Mode: `production`

### Still not working?
**Check logs:**
1. In Node.js section, click **"Logs"**
2. Look for error messages
3. Common fix: Run "NPM Install" again

---

## **Quick Test:**

Visit these URLs to check status:

1. **https://khewracrafts.com/server-status**
   - Shows if server is running
   - Shows if React build exists

2. **https://khewracrafts.com/api/health**
   - Shows API status
   - Shows build folder status

3. **https://khewracrafts.com**
   - Your main website

---

## **That's It!**

Your VitalBlaze website should now be live at:
**https://khewracrafts.com** 🎉

If you see the server status page instead of your website, you just need to build the React app (see instructions above).

---

**Need help? Check `QUICK_FIX_GUIDE.md` for detailed troubleshooting.**

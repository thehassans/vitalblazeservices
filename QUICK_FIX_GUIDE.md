# 🔧 Quick Fix Guide - "Not Found" Error on khewracrafts.com

## ❌ Current Issue:
Your website shows **"Not Found"** because:
1. Files aren't uploaded to the server, OR
2. Node.js app isn't running in Plesk

---

## ✅ Quick Solution (5 Minutes):

### **Step 1: Upload Files Using Git (Easiest Method)**

1. **Login to Plesk:** https://portal.vitalblaze.com
2. **Go to:** Websites & Domains → khewracrafts.com
3. **Click:** Git (in left sidebar)
4. **Click:** "Add Repository" button
5. **Fill in:**
   ```
   Repository URL: https://github.com/thehassans/vitalblazeservices.git
   Branch: main
   Repository path: /httpdocs
   ```
6. **Click:** "OK"
7. **Click:** "Pull Updates" or "Deploy" button
8. **Wait:** ~30 seconds for files to download

---

### **Step 2: Verify Files Exist**

1. **Go to:** Files → File Manager
2. **Navigate to:** `/httpdocs`
3. **Check these files exist:**
   - ✅ `app.js`
   - ✅ `package.json`
   - ✅ `server/` folder
   - ✅ `client/` folder

**If files DON'T exist:** Repeat Step 1 or upload manually via File Manager.

---

### **Step 3: Install Dependencies**

1. **Go to:** Node.js section (Websites & Domains → Node.js)
2. **Click:** "NPM Install" button
3. **Wait:** 1-2 minutes for installation

---

### **Step 4: Configure Node.js Settings**

Make sure these are set correctly:

| Setting | Value |
|---------|-------|
| **Document Root** | `/httpdocs` |
| **Application Root** | `/httpdocs` |
| **Application Startup File** | `app.js` |
| **Application Mode** | `production` |
| **Node.js version** | 24.11.0 (or latest) |

**To change:** Click [edit] next to each setting.

---

### **Step 5: Set Environment Variables**

1. **Click:** "[specify]" next to "Custom environment variables"
2. **Copy and paste these** (change values as needed):

```
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@vitalblaze.com
EMAIL_TO=info@vitalblaze.com
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
SESSION_SECRET=random-32-char-string-here
JWT_SECRET=another-random-32-char-string-here
```

3. **Click:** "OK" to save

---

### **Step 6: Enable & Restart Node.js**

1. **Click:** "Enable Node.js" button (if not already enabled)
2. **Click:** "Restart App" button
3. **Wait:** 10 seconds

---

### **Step 7: Test Your Site**

1. **Visit:** https://khewracrafts.com
2. **Should see:** Your VitalBlaze website

**If still not working:**
- Check: https://khewracrafts.com/api/health
- Should show: `{"status":"ok","message":"VitalBlaze Services API is running"}`

---

## 🔍 Troubleshooting:

### **Problem: Files uploaded but still "Not Found"**

**Solution:**
1. Check Node.js is **enabled** (green status)
2. Check **Application Startup File** is `app.js` (not `client/src/index.js`)
3. Check **Document Root** is `/httpdocs` (not `/httpdocs/client`)
4. Click "Restart App"

---

### **Problem: "Cannot find module" error**

**Solution:**
1. Go to Node.js section
2. Click "NPM Install"
3. Wait for completion
4. Click "Restart App"

---

### **Problem: Git deploy failed**

**Solution - Manual Upload:**

1. **On your computer:**
   - Compress project folder as ZIP (exclude `node_modules`)
   
2. **In Plesk File Manager:**
   - Navigate to `/httpdocs`
   - Upload ZIP file
   - Extract it
   - Delete ZIP file

3. **Continue from Step 3** (Install Dependencies)

---

### **Problem: Port already in use**

**Solution:**
1. Change `PORT` environment variable to `8080` or `3001`
2. Restart app

---

### **Problem: React app not loading**

**Solution - Build React:**

Via SSH:
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs/client
npm install
npm run build
```

Or build locally and upload `build` folder to `/httpdocs/client/build/`

---

## 📊 Checklist (Complete in Order):

- [ ] Files uploaded to `/httpdocs` (via Git or manual)
- [ ] `app.js` exists in `/httpdocs/`
- [ ] Document Root = `/httpdocs`
- [ ] Application Startup File = `app.js`
- [ ] Application Mode = `production`
- [ ] Environment variables set
- [ ] npm install completed
- [ ] Node.js enabled
- [ ] Application restarted
- [ ] Website loads at https://khewracrafts.com

---

## 🆘 Still Not Working?

### **Check Logs:**

1. **In Plesk Node.js section:**
   - Click "Logs" button
   - Look for error messages

2. **Common Errors & Fixes:**
   - `ENOENT: no such file` → Files not uploaded
   - `Cannot find module 'express'` → Run npm install
   - `Port 3000 in use` → Change PORT variable
   - `app.js not found` → Check Application Startup File setting

---

## 🎯 Most Common Cause:

**90% of "Not Found" errors are because:**
1. ❌ Files not uploaded to server
2. ❌ Wrong Document Root (`/httpdocs/client` instead of `/httpdocs`)
3. ❌ Wrong startup file (`client/src/index.js` instead of `app.js`)
4. ❌ Node.js not enabled or not restarted

**Fix these 4 things and your site will work!**

---

## 📞 Need Help?

1. Take screenshot of Plesk Node.js settings
2. Take screenshot of File Manager showing `/httpdocs` folder
3. Take screenshot of Logs (if showing errors)
4. Share screenshots for specific troubleshooting

---

## ✨ Once Working:

You should see:
- ✅ VitalBlaze homepage with hero section
- ✅ Services section with all services
- ✅ Language toggle (EN/AR) working
- ✅ Contact form working
- ✅ Admin panel at: https://khewracrafts.com/admin

---

**Follow steps 1-7 in order and your site will be live!** 🚀

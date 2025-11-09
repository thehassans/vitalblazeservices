# Create .env File - Copy/Paste These Exact Commands

Run these commands in your SSH terminal **one by one**:

---

## Step 1: Navigate to Project Directory

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
pwd
```

**You should see:** `/var/www/vhosts/khewracrafts.com/httpdocs`

---

## Step 2: Remove Old .env (if exists)

```bash
rm -f .env
```

---

## Step 3: Create New .env File

**Copy and paste this ENTIRE block** (all lines together):

```bash
cat > .env << 'ENDOFFILE'
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:YOUR_MONGODB_PASSWORD_HERE@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=vital-plesk-session-secret-2024
JWT_SECRET=vital-plesk-jwt-secret-2024
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
ENDOFFILE
```

---

## Step 4: Edit and Add Your MongoDB Password

```bash
nano .env
```

**In nano editor:**
1. Find the line: `MONGODB_URI=mongodb+srv://vitalservices:YOUR_MONGODB_PASSWORD_HERE@...`
2. Replace `YOUR_MONGODB_PASSWORD_HERE` with your actual MongoDB password
3. Press `Ctrl+X`
4. Press `Y`
5. Press `Enter`

---

## Step 5: Verify .env File

```bash
cat .env
```

**You should see your MongoDB URI with the password filled in.**

---

## Step 6: Test Environment Variable

```bash
node -e "require('dotenv').config(); console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'FOUND ✅' : 'NOT FOUND ❌')"
```

**Expected Output:** `MONGODB_URI: FOUND ✅`

---

## Step 7: Initialize Database

```bash
npm run init-db
```

**Expected Output:**
```
✅ Connected to MongoDB
✅ Admin user created successfully
📦 Importing services...
✅ Services imported: 20
🎉 Database initialization complete!
```

---

## ⚠️ IMPORTANT: MongoDB Password Format

If your MongoDB password contains special characters, you must URL encode them:

### Common Special Characters:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `^` → `%5E`
- `&` → `%26`
- `+` → `%2B`
- `/` → `%2F`
- `=` → `%3D`
- `?` → `%3F`
- `space` → `%20`

### Example:
If your password is: `MyPass@123#Word`

Then in your .env file it should be:
```
MONGODB_URI=mongodb+srv://vitalservices:MyPass%40123%23Word@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
```

---

## 🔍 Troubleshooting

### If you still get "undefined" error:

**Check file location:**
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
ls -la .env
```

**You should see:** `-rw-r--r-- 1 username username 500 Nov 9 21:00 .env`

**Check file content:**
```bash
cat .env | grep MONGODB_URI
```

**You should see your full MongoDB connection string.**

### If .env exists but not loading:

**Check permissions:**
```bash
chmod 644 .env
```

**Verify dotenv package is installed:**
```bash
npm list dotenv
```

**Should show:** `dotenv@16.3.1` (or similar)

---

## 🎯 Quick Copy-Paste Solution

If you know your MongoDB password, replace `YOUR_PASSWORD` below and run:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
echo 'PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:YOUR_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=vital-session-2024
JWT_SECRET=vital-jwt-2024
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com' > .env
npm run init-db
```

**Replace `YOUR_PASSWORD` with your actual MongoDB password!**

---

## ✅ Success Checklist:

- [ ] Navigate to `/var/www/vhosts/khewracrafts.com/httpdocs`
- [ ] Create .env file
- [ ] Add MongoDB password (URL encoded if needed)
- [ ] Save file
- [ ] Verify with `cat .env`
- [ ] Test with node command (should show "FOUND ✅")
- [ ] Run `npm run init-db`
- [ ] See success messages
- [ ] Services appear on website

---

**The key issue: The .env file must be in `/var/www/vhosts/khewracrafts.com/httpdocs` with the correct MongoDB URI!**

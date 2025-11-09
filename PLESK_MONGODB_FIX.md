# Plesk MongoDB Setup Fix

The error shows that MongoDB URI is not being read. Here's how to fix it:

---

## 🔧 **Quick Fix (2 Options):**

### **Option 1: Create .env File via SSH (Recommended)**

SSH into your Plesk server and run these commands:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Create .env file
cat > .env << 'EOF'
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:YOUR_MONGODB_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=vital-plesk-session-secret-2024-change-this
JWT_SECRET=vital-plesk-jwt-secret-2024-change-this
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@vitalblaze.com
EMAIL_TO=info@vitalblaze.com
EOF

# IMPORTANT: Now edit the file and replace YOUR_MONGODB_PASSWORD
nano .env
# or
vi .env
```

**Replace:**
- `YOUR_MONGODB_PASSWORD` with your actual MongoDB password

**Save and exit:**
- In nano: Press `Ctrl+X`, then `Y`, then `Enter`
- In vi: Press `Esc`, type `:wq`, press `Enter`

Then run:
```bash
npm run init-db
```

---

### **Option 2: Use Plesk Environment Variables**

1. **Go to Plesk Panel:**
   - Login to https://khewracrafts.com:8443
   - Navigate to your domain
   - Click **Node.js**

2. **Add Environment Variables:**
   - Scroll to "Custom environment variables"
   - Click **[specify]**
   
3. **Add these variables** (one per line):

```
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:YOUR_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=vital-plesk-session-2024
JWT_SECRET=vital-plesk-jwt-2024
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
```

4. **Replace `YOUR_PASSWORD`** with your MongoDB password

5. **Save and Restart** the Node.js application

6. **Then run via SSH:**
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
npm run init-db
```

---

## 🔐 **Get Your MongoDB Password:**

Your MongoDB connection string is:
```
mongodb+srv://vitalservices:<db_password>@vitalservices.hgqktr5.mongodb.net/?appName=vitalservices
```

**You need to:**
1. Go to MongoDB Atlas (https://cloud.mongodb.com)
2. Login to your account
3. Go to **Database Access**
4. Find user `vitalservices`
5. Click **Edit** or **Show Password**
6. Copy the password
7. Replace `<db_password>` in the URI with your actual password

**Full URI should look like:**
```
mongodb+srv://vitalservices:abc123XYZ@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
```

---

## ✅ **Verify It Works:**

After creating the .env file or setting environment variables:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
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

## 🔍 **If Still Not Working:**

### Check .env file exists:
```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
ls -la .env
cat .env
```

### Check MongoDB password:
Make sure there are NO special characters that need URL encoding in your password.

If your password has special characters like `@`, `#`, `%`, etc., you need to URL encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `%` becomes `%25`
- etc.

### Test MongoDB connection:
```bash
node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI)"
```

This should print your MongoDB URI (without showing password).

---

## 📝 **Quick Copy-Paste SSH Commands:**

```bash
# Navigate to project
cd /var/www/vhosts/khewracrafts.com/httpdocs

# Create .env file (paste this whole block)
cat > .env << 'EOF'
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:PASTE_YOUR_PASSWORD_HERE@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=vital-session-$(date +%s)-secret
JWT_SECRET=vital-jwt-$(date +%s)-secret
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_FROM=noreply@vitalblaze.com
EMAIL_TO=info@vitalblaze.com
EOF

# Edit to add your MongoDB password
nano .env

# After saving, initialize database
npm run init-db
```

---

## 🚀 **After Successful Init:**

Once you see the success message, restart your Node.js app in Plesk:
1. Go to Plesk → Node.js
2. Click **Restart** button
3. Your site should now be connected to MongoDB!

---

**Need help?** The error means the `.env` file is missing or the `MONGODB_URI` variable is not set. Follow Option 1 above to create it.

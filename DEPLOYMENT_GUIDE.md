# VitalBlaze Services - Plesk Deployment Guide

## 🚀 Deployment Steps for Plesk

### Step 1: Prepare Your Application

#### 1.1 Update Application Startup File
Your Plesk shows `app.js` as the startup file, but your server is in `server/index.js`. You need to create a root-level `app.js` file:

Create `app.js` in the project root:
```javascript
// Load environment variables
require('dotenv').config();

// Start the server
require('./server/index.js');
```

#### 1.2 Update package.json for Production
Your root `package.json` should have the correct start script:
```json
{
  "name": "vitalblaze-services",
  "version": "1.0.0",
  "description": "VitalBlaze Premium Web Services Platform",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "client": "cd client && npm start",
    "build": "cd client && npm run build"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

---

## 📁 File Upload to Plesk

### Option 1: Using Git (Recommended)

1. **Connect Git Repository in Plesk:**
   - In Plesk, go to **"Git"** section
   - Click **"Add Repository"**
   - Enter: `https://github.com/thehassans/vitalblazeservices.git`
   - Branch: `main`
   - Deploy path: `/httpdocs`
   - Click **"OK"**

2. **Pull and Deploy:**
   - Click **"Pull Updates"** button
   - Plesk will automatically pull latest code from GitHub

### Option 2: Using File Manager

1. **Upload Files:**
   - In Plesk, go to **"Files"** → **"File Manager"**
   - Navigate to `/httpdocs`
   - Upload all project files (except `node_modules` and `client/node_modules`)

2. **Or use FTP/SFTP:**
   - Host: Your domain (khewracrafts.com)
   - Username: Your Plesk FTP username
   - Password: Your FTP password
   - Upload to: `/httpdocs`

---

## 🔧 Configure Node.js in Plesk

### 1. Application Settings

Set these in Plesk Node.js settings:

| Setting | Value |
|---------|-------|
| **Node.js Version** | 24.11.0 or Latest LTS |
| **Package Manager** | npm |
| **Document Root** | `/httpdocs` |
| **Application Mode** | `production` |
| **Application Root** | `/httpdocs` |
| **Application Startup File** | `app.js` |

### 2. Click "Enable Node.js" button

---

## 🔐 Custom Environment Variables

### How to Set Environment Variables in Plesk:

1. **In Plesk Node.js Dashboard:**
   - Click **"[specify]"** link next to "Custom environment variables"
   
2. **Add These Variables:**

```bash
# Server Configuration
PORT=3000
NODE_ENV=production

# Admin Credentials (CHANGE THESE!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-here

# Email Configuration (for Contact Form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@vitalblaze.com
EMAIL_TO=info@vitalblaze.com

# CORS Configuration
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com

# Database (if you add MongoDB later)
# MONGODB_URI=mongodb://localhost:27017/vitalblaze

# Security
SESSION_SECRET=your-random-session-secret-key-here
JWT_SECRET=your-jwt-secret-key-here
```

### 3. Format in Plesk:
Each variable should be entered as `KEY=VALUE`, one per line:
```
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!
EMAIL_HOST=smtp.gmail.com
```

---

## 📦 Install Dependencies

### Using Plesk Interface:

1. **Go to Node.js Dashboard**
2. **Click "NPM Install" button**
3. Plesk will run `npm install` automatically

### Or via SSH:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs
npm install
cd client
npm install
npm run build
```

---

## 🏗️ Build React Frontend

### Option 1: Build Locally and Upload

```bash
# On your local machine
cd client
npm run build

# Upload the 'build' folder to Plesk at:
# /httpdocs/client/build/
```

### Option 2: Build on Server (via SSH)

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs/client
npm run build
```

---

## 🌐 Configure Server to Serve React App

Update `server/index.js` to serve the React build:

```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/services', require('./routes/services'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/contact', require('./routes/contact'));

// Serve React App in Production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // Handle React routing - return index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
```

---

## 🔄 Restart Application

After making changes:

1. **In Plesk Node.js Dashboard:**
   - Click **"Restart App"** button

2. **Or via SSH:**
```bash
touch /var/www/vhosts/khewracrafts.com/httpdocs/tmp/restart.txt
```

---

## 🔍 Troubleshooting

### Check Application Logs

1. **In Plesk:**
   - Go to Node.js Dashboard
   - Click **"Logs"** button
   - View application logs and errors

### Common Issues:

#### 1. Port Already in Use
**Solution:** Change PORT in environment variables to 3000 or 8080

#### 2. Module Not Found
**Solution:** Run `npm install` again in Plesk

#### 3. Application Won't Start
**Solution:** 
- Check startup file is `app.js`
- Check logs for errors
- Verify all environment variables are set

#### 4. React App Shows 404
**Solution:**
- Build React app: `cd client && npm run build`
- Verify build folder exists at `/httpdocs/client/build`
- Check server.js serves static files

---

## 📧 Email Setup (Contact Form)

### Using Gmail:

1. **Enable 2-Factor Authentication** in Gmail
2. **Generate App Password:**
   - Go to Google Account → Security
   - App Passwords → Generate
   - Use this as `EMAIL_PASS`

3. **Set Variables:**
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

### Using Plesk Email:

```
EMAIL_HOST=localhost
EMAIL_PORT=587
EMAIL_USER=noreply@khewracrafts.com
EMAIL_PASS=your-email-password
```

---

## 🔐 Security Checklist

- [ ] Change default admin username/password
- [ ] Set strong SESSION_SECRET and JWT_SECRET
- [ ] Enable HTTPS/SSL in Plesk
- [ ] Set NODE_ENV to 'production'
- [ ] Restrict CORS to your domain only
- [ ] Don't commit .env file to GitHub
- [ ] Use environment variables for all secrets

---

## 🚦 Post-Deployment Checklist

- [ ] Application starts without errors
- [ ] Website loads at https://khewracrafts.com
- [ ] Language toggle (EN/AR) works
- [ ] Services display correctly
- [ ] Contact form sends emails
- [ ] Admin panel login works
- [ ] All API endpoints respond
- [ ] RTL layout works for Arabic
- [ ] Mobile responsive design works

---

## 📞 Support

If you need help:
1. Check Plesk logs
2. Check GitHub repository issues
3. Contact Plesk support
4. Check Node.js documentation

---

## 🔄 Updating the Application

### Method 1: Using Git (Recommended)

```bash
# In Plesk Git section
1. Click "Pull Updates"
2. Click "Restart App"
```

### Method 2: Manual Update

```bash
# Via SSH
cd /var/www/vhosts/khewracrafts.com/httpdocs
git pull origin main
npm install
cd client && npm install && npm run build
touch tmp/restart.txt
```

---

## 📚 Useful Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0

# Check running processes
ps aux | grep node

# View logs in real-time
tail -f /var/www/vhosts/khewracrafts.com/logs/node.log

# Restart application
touch /var/www/vhosts/khewracrafts.com/httpdocs/tmp/restart.txt
```

---

## 🎉 Deployment Complete!

Your VitalBlaze Services application should now be live at:
**https://khewracrafts.com**

Enjoy your fully bilingual, RTL-supported, premium web services platform!

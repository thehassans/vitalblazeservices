# 🔐 Plesk Environment Variables - Quick Setup Guide

## Step-by-Step Instructions

### 1. Access Environment Variables in Plesk

1. Log in to your **Plesk Control Panel**
2. Go to **Websites & Domains**
3. Find your domain (khewracrafts.com)
4. Click on **Node.js** icon
5. Scroll to **"Custom environment variables"**
6. Click **"[specify]"** link

---

## 2. Add These Environment Variables

Copy and paste each line below into the Plesk environment variables section:

```bash
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
EMAIL_FROM=noreply@vitalblaze.com
EMAIL_TO=info@vitalblaze.com
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
SESSION_SECRET=generate-random-32-char-string-here
JWT_SECRET=another-random-32-char-string-here
```

---

## 3. Generate Secure Random Secrets

### For SESSION_SECRET and JWT_SECRET:

**Option 1: Using Node.js (Recommended)**
```bash
# Open terminal and run:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Online Generator**
Visit: https://www.random.org/strings/
- Generate a 32-character alphanumeric string

**Option 3: Manual**
Use this example (but generate your own!):
```
SESSION_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
JWT_SECRET=z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4
```

---

## 4. Gmail App Password Setup (For Contact Form)

### Steps:

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/

2. **Enable 2-Factor Authentication**
   - Security → 2-Step Verification → Turn On

3. **Generate App Password**
   - Security → App Passwords
   - Select: Mail, Other (Custom name)
   - Name it: "VitalBlaze Contact Form"
   - Click **Generate**

4. **Copy the 16-digit Password**
   - Example: `abcd efgh ijkl mnop`
   - Remove spaces: `abcdefghijklmnop`

5. **Add to Plesk:**
   ```
   EMAIL_PASS=abcdefghijklmnop
   ```

---

## 5. Complete Variable List with Examples

```bash
# Server Configuration
PORT=3000
NODE_ENV=production

# Admin Credentials (CHANGE THESE!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=SuperSecure@123!VitalBlaze

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
EMAIL_FROM=noreply@vitalblaze.com
EMAIL_TO=info@vitalblaze.com

# CORS Configuration
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com

# Security Keys (Generate unique values!)
SESSION_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
JWT_SECRET=z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4
```

---

## 6. Verify Configuration

After adding environment variables:

1. **Click "OK" or "Apply"** to save
2. **Restart Node.js Application:**
   - Click **"Restart App"** button in Plesk

3. **Check Application is Running:**
   - Visit: `https://khewracrafts.com/api/health`
   - Should show: `{"status":"ok","message":"VitalBlaze Services API is running"}`

---

## 7. Test Contact Form Email

1. Visit your website contact form
2. Fill in test details
3. Submit the form
4. Check if email arrives at `EMAIL_TO` address

If email doesn't work:
- ✅ Verify Gmail App Password is correct (no spaces)
- ✅ Check 2FA is enabled on Gmail
- ✅ Check Plesk logs for errors
- ✅ Try using Plesk's built-in email instead

---

## 8. Security Best Practices

### ✅ DO:
- Use strong, unique passwords (20+ characters)
- Generate random SESSION_SECRET and JWT_SECRET
- Use Gmail App Password (not your real password)
- Change default admin credentials
- Use HTTPS only (enable SSL in Plesk)

### ❌ DON'T:
- Use simple passwords like "admin123"
- Share credentials publicly
- Commit .env file to GitHub
- Use same password for multiple services
- Use production credentials in development

---

## 9. Alternative Email Providers

### Using Plesk Email:
```bash
EMAIL_HOST=localhost
EMAIL_PORT=587
EMAIL_USER=noreply@khewracrafts.com
EMAIL_PASS=your-plesk-email-password
EMAIL_FROM=noreply@khewracrafts.com
EMAIL_TO=info@khewracrafts.com
```

### Using SendGrid:
```bash
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=noreply@khewracrafts.com
EMAIL_TO=info@khewracrafts.com
```

### Using Mailgun:
```bash
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@your-domain.mailgun.org
EMAIL_PASS=your-mailgun-password
EMAIL_FROM=noreply@khewracrafts.com
EMAIL_TO=info@khewracrafts.com
```

---

## 10. Troubleshooting

### Environment Variables Not Working?

**Check:**
1. Variables are saved in Plesk
2. Application is restarted after changes
3. No typos in variable names (case-sensitive!)
4. No extra spaces in values
5. Check logs: `/var/www/vhosts/khewracrafts.com/logs/node.log`

### Application Not Starting?

**Solutions:**
1. Check all required variables are set
2. Verify `app.js` exists in root directory
3. Run `npm install` in Plesk
4. Check Node.js version compatibility (v14+)
5. View logs for specific error messages

---

## 📋 Quick Copy-Paste Template

Replace `YOUR_*` values with actual data:

```bash
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=YOUR_ADMIN_USERNAME
ADMIN_PASSWORD=YOUR_SECURE_PASSWORD
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=YOUR_GMAIL@gmail.com
EMAIL_PASS=YOUR_16_DIGIT_APP_PASSWORD
EMAIL_FROM=noreply@vitalblaze.com
EMAIL_TO=YOUR_CONTACT_EMAIL@example.com
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
SESSION_SECRET=YOUR_RANDOM_32_CHAR_STRING
JWT_SECRET=YOUR_ANOTHER_RANDOM_32_CHAR_STRING
```

---

## ✅ Checklist

- [ ] All environment variables added in Plesk
- [ ] Secure passwords generated
- [ ] Gmail App Password created
- [ ] Variables saved and applied
- [ ] Application restarted
- [ ] API health check passes
- [ ] Contact form sends emails
- [ ] Admin login works
- [ ] Website loads correctly

---

## 🆘 Need Help?

1. **Check Plesk Logs:**
   - Node.js section → Logs

2. **Check Server Logs:**
   - SSH: `tail -f /var/www/vhosts/khewracrafts.com/logs/node.log`

3. **Test API:**
   - Visit: `https://khewracrafts.com/api/health`

4. **Verify Variables:**
   - SSH: `echo $PORT` (check if variables are accessible)

---

**🎉 Once all variables are set, your VitalBlaze Services will be fully configured and ready to go!**

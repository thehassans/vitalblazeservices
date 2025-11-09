# Create Your .env File

Copy and paste this entire content into a new file named `.env` in your project root.

**Important:** Replace `YOUR_MONGODB_PASSWORD` with your actual MongoDB password!

---

```env
# =====================================================
# VitalBlaze Services - Environment Variables
# =====================================================

# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Database Configuration
MONGODB_URI=mongodb+srv://vitalservices:YOUR_MONGODB_PASSWORD@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority

# ⚠️ IMPORTANT: Replace YOUR_MONGODB_PASSWORD above with your actual MongoDB password!

# Admin Panel Credentials
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468

# Security Keys
SESSION_SECRET=vital-dev-session-secret-key-2024
JWT_SECRET=vital-dev-jwt-secret-key-2024

# Email Configuration (Contact Form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=noreply@vitalblaze.com
EMAIL_TO=info@vitalblaze.com

# CORS Configuration
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000
```

---

## Quick Steps:

1. **Create file:** Create a new file named `.env` in `C:\Users\buysialllc\Desktop\VitalServices\`

2. **Copy content:** Copy everything between the triple backticks above

3. **Paste:** Paste into your `.env` file

4. **Replace password:** Find `YOUR_MONGODB_PASSWORD` and replace it with your actual password

5. **Save:** Save the file

6. **Run:** Execute `npm run init-db`

---

## For Production/Plesk:

Generate secure secrets before deploying:

```bash
# Windows PowerShell - Run these commands:

# Generate SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then update the `.env` file or Plesk environment variables with these secure keys.

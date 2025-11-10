# Fix Domain Not Reaching Node.js Server

## 🎯 **The Real Problem:**

Your website https://khewracrafts.com is being served by **Apache/Nginx**, not by your Node.js server.

- ✅ `curl http://localhost:3000/api/services` works (Node server)
- ❌ Browser requests to `https://khewracrafts.com/api/services` don't reach Node

**Solution:** Configure Apache to proxy API requests to Node.js

---

## 🔧 **Test First:**

```bash
# Test if domain reaches Node server
curl -s https://khewracrafts.com/api/services | head -50

# Compare with localhost
curl -s http://localhost:3000/api/services | head -50
```

**If they're different:** Domain isn't reaching Node server ⚠️

---

## ✅ **Fix Option 1: Plesk Node.js Settings**

### Step 1: Go to Plesk Panel
- Open Plesk for khewracrafts.com
- Go to **"Node.js"** section

### Step 2: Configure Application
- **Application Mode:** Production
- **Application Root:** `/httpdocs`
- **Application Startup File:** `server/index.js`
- **Application URL:** `/` (root)
- **Custom environment variables:**
  ```
  NODE_ENV=production
  PORT=3000
  ```

### Step 3: Enable and Restart
- Click **"Enable Node.js"**
- Click **"Restart App"**

### Step 4: Check Apache Configuration
Plesk should auto-generate proxy rules, but verify:
- Go to **"Apache & nginx Settings"**
- Check if proxy directives exist

---

## ✅ **Fix Option 2: Manual Apache Configuration**

### Create .htaccess in httpdocs folder:

```bash
cd /var/www/vhosts/khewracrafts.com/httpdocs

cat > .htaccess << 'EOF'
RewriteEngine On

# Proxy API requests to Node.js server
RewriteCond %{REQUEST_URI} ^/api/ [NC]
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Proxy other requests to Node.js (it will serve React build)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Enable proxy
ProxyPreserveHost On
ProxyPass /api/ http://localhost:3000/api/
ProxyPassReverse /api/ http://localhost:3000/api/
EOF
```

### Restart Apache:
```bash
sudo systemctl restart apache2
# or
sudo systemctl restart httpd
```

---

## ✅ **Fix Option 3: Use Port in Domain**

### Configure Plesk to serve Node.js directly:

1. **In Plesk → Hosting Settings:**
   - Change **Document root** to: `/httpdocs/client/build`
   - Or keep as `/httpdocs`

2. **In Plesk → Apache & nginx Settings:**
   - Add to **Additional directives for HTTP:**
   ```apache
   ProxyPass /api http://localhost:3000/api
   ProxyPassReverse /api http://localhost:3000/api
   ProxyPass / http://localhost:3000/
   ProxyPassReverse / http://localhost:3000/
   ProxyPreserveHost On
   ```

3. **Apply → OK → Restart**

---

## ✅ **Fix Option 4: Simpler - Let Node Serve Everything**

### Change domain to point directly to Node.js:

1. **In Plesk → Hosting Settings:**
   - Enable **Proxy mode**
   - Set proxy to: `http://localhost:3000`

2. **Your Node server already serves:**
   - Static files from `/client/build`
   - API endpoints from `/api/*`
   - Everything works!

---

## 🧪 **Test After Fix:**

```bash
# Should return data
curl https://khewracrafts.com/api/services | head -50

# Should match localhost
diff <(curl -s http://localhost:3000/api/services) <(curl -s https://khewracrafts.com/api/services)
```

---

## 🎯 **Quick Test Command:**

```bash
echo "Testing domain API..."
RESPONSE=$(curl -s https://khewracrafts.com/api/services | head -100)
if echo "$RESPONSE" | grep -q '"count":15'; then
    echo "✅ Domain API works!"
else
    echo "❌ Domain API not working"
    echo "Response: $RESPONSE"
fi
```

---

## 📊 **Most Likely Issue:**

| Problem | Cause | Solution |
|---------|-------|----------|
| Static files load but API doesn't work | Apache serving files, not proxying API | Add ProxyPass directives |
| Blank services section | API calls blocked by CORS or 404 | Configure proxy to Node.js |
| Works on localhost, not domain | Domain not reaching Node server | Enable Plesk Node.js or proxy |

---

## 🔍 **Check Plesk Error Logs:**

```bash
tail -50 /var/log/apache2/error.log
# or
tail -50 /var/log/httpd/error_log
```

---

**Try Fix Option 1 first (Plesk Node.js settings) - it's the easiest!**

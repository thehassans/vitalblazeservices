# Check Browser Console for Errors

The services section is empty. Let's see what's happening in the browser.

---

## 🔍 **Open Browser Console (Do This Now):**

1. On https://khewracrafts.com
2. Press **F12** (or right-click → Inspect)
3. Click **Console** tab
4. Look for red errors

---

## 📸 **Take Screenshots Of:**

1. **Console tab** - Any red error messages
2. **Network tab** - Look for `/api/services` request

---

## 🧪 **Also Run This in Browser Console:**

Copy and paste this into the Console tab:

```javascript
fetch('/api/services')
  .then(r => r.json())
  .then(data => {
    console.log('API Response:', data);
    console.log('Services count:', data.count);
    console.log('Has data?', data.data && data.data.length > 0);
  })
  .catch(err => console.error('API Error:', err));
```

**Share what it prints!**

---

## 🔧 **Common Errors You Might See:**

### Error 1: "Failed to fetch" or "NetworkError"
**Meaning:** API server not running or not accessible

**Fix:** Check if server is running in SSH:
```bash
ps aux | grep "server/index.js"
```

### Error 2: "404 Not Found"
**Meaning:** API endpoint doesn't exist

**Fix:** Server needs to be restarted

### Error 3: CORS error
**Meaning:** CORS policy blocking request

**Fix:** Need to update CORS configuration

### Error 4: No error but empty array
**Meaning:** API works but database is empty

**Fix:** Run `npm run init-db`

---

## 📋 **Quick Test (Run in SSH):**

```bash
# Test if API responds
curl https://khewracrafts.com/api/services

# Should return JSON with services
```

---

**Check the browser console and share what errors you see!**

# Browser Debugging - Services Not Showing

## 🔍 **Open Browser Console (F12)**

On https://khewracrafts.com:
1. Press **F12**
2. Go to **Console** tab
3. Look for any errors

---

## 🧪 **Run These Commands in Console:**

### Test 1: Check if API_BASE_URL is correct
```javascript
console.log('Current origin:', window.location.origin);
```

### Test 2: Manually fetch services
```javascript
fetch('/api/services')
  .then(r => r.json())
  .then(data => {
    console.log('API Response:', data);
    console.log('Count:', data.count);
    console.log('First service:', data.data[0]);
  })
  .catch(err => console.error('Error:', err));
```

### Test 3: Check React state
```javascript
// Look for console logs from Services.js
// Should see: "Services fetched: {success: true, count: 15, ...}"
```

---

## 📸 **What to Screenshot:**

1. **Console tab** - All messages (especially red errors)
2. **Network tab** - Filter by "services", show the `/api/services` request

---

## 🔧 **Common Issues:**

### Issue 1: CORS Error
```
Access to fetch at 'https://khewracrafts.com/api/services' 
from origin 'https://khewracrafts.com' has been blocked by CORS policy
```

### Issue 2: 404 Not Found
```
GET https://khewracrafts.com/api/services 404 (Not Found)
```

### Issue 3: Loading State Stuck
```
// Services component stuck in loading state
// Check if setLoading(false) is being called
```

---

## 🎯 **Tell Me:**

1. Any red errors in Console?
2. What does `fetch('/api/services')` return?
3. Do you see "Services fetched:" log?
4. In Network tab, is `/api/services` request happening?

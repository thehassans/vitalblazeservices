#!/bin/bash

# Complete Diagnostic Script
# Run this: bash DIAGNOSE.sh

echo "=================================================="
echo "  VitalBlaze Services - Complete Diagnostic"
echo "=================================================="

cd /var/www/vhosts/khewracrafts.com/httpdocs

echo -e "\n=== 1. SERVER PROCESS STATUS ==="
SERVER_RUNNING=$(ps aux | grep "server/index.js" | grep -v grep)
if [ -z "$SERVER_RUNNING" ]; then
    echo "❌ Server is NOT running"
else
    echo "✅ Server is running"
    echo "$SERVER_RUNNING"
fi

echo -e "\n=== 2. TEST API ON LOCALHOST ==="
API_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" http://localhost:3000/api/services 2>&1)
if echo "$API_RESPONSE" | grep -q "HTTP_CODE:200"; then
    echo "✅ API is responding"
    echo "$API_RESPONSE" | grep -o '"count":[0-9]*'
else
    echo "❌ API is NOT responding"
    echo "$API_RESPONSE"
fi

echo -e "\n=== 3. TEST API ON DOMAIN ==="
DOMAIN_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" https://khewracrafts.com/api/services 2>&1)
if echo "$DOMAIN_RESPONSE" | grep -q "HTTP_CODE:200"; then
    echo "✅ Domain API is responding"
    echo "$DOMAIN_RESPONSE" | grep -o '"count":[0-9]*'
else
    echo "❌ Domain API is NOT responding"
    echo "$DOMAIN_RESPONSE" | head -10
fi

echo -e "\n=== 4. CHECK CLIENT BUILD ==="
if [ -f "client/build/index.html" ]; then
    echo "✅ Client build exists"
    BUILD_DATE=$(stat -c %y client/build/index.html 2>/dev/null || stat -f %Sm client/build/index.html 2>/dev/null)
    echo "   Build date: $BUILD_DATE"
else
    echo "❌ Client build does NOT exist"
fi

echo -e "\n=== 5. CHECK .ENV FILE ==="
if [ -f ".env" ]; then
    echo "✅ .env file exists"
    grep -E "(PORT|MONGODB_URI|NODE_ENV)" .env | sed 's/:[^@]*@/:***@/g'
else
    echo "❌ .env file does NOT exist"
fi

echo -e "\n=== 6. CHECK MONGODB CONNECTION ==="
if [ -f ".env" ]; then
    MONGO_CHECK=$(node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI ? 'CONFIGURED' : 'NOT CONFIGURED');" 2>&1)
    if [ "$MONGO_CHECK" = "CONFIGURED" ]; then
        echo "✅ MongoDB URI is configured"
    else
        echo "❌ MongoDB URI is NOT configured"
    fi
else
    echo "❌ Cannot check - .env missing"
fi

echo -e "\n=== 7. CHECK SERVER LOGS (Last 10 lines) ==="
if [ -f "server.log" ]; then
    echo "--- server.log ---"
    tail -10 server.log
else
    echo "ℹ️  No server.log file found"
fi

echo -e "\n=== 8. CHECK GIT STATUS ==="
git log -1 --oneline 2>/dev/null || echo "Not a git repository"

echo -e "\n=================================================="
echo "  DIAGNOSTIC COMPLETE"
echo "=================================================="

echo -e "\n📋 SUMMARY:"
if [ ! -z "$SERVER_RUNNING" ]; then
    echo "✅ Server running"
else
    echo "❌ Server NOT running - START IT NOW"
fi

if echo "$API_RESPONSE" | grep -q "HTTP_CODE:200"; then
    echo "✅ API working locally"
else
    echo "❌ API NOT working locally"
fi

if echo "$DOMAIN_RESPONSE" | grep -q "HTTP_CODE:200"; then
    echo "✅ API working on domain"
else
    echo "❌ API NOT working on domain"
fi

if [ -f "client/build/index.html" ]; then
    echo "✅ Client built"
else
    echo "❌ Client NOT built - BUILD IT NOW"
fi

echo -e "\n=================================================="

#!/bin/bash

# Complete Fix Script
# Run this: bash FIX_ALL.sh

echo "=================================================="
echo "  VitalBlaze Services - Complete Fix"
echo "=================================================="

cd /var/www/vhosts/khewracrafts.com/httpdocs || exit 1

# Step 1: Pull latest code
echo -e "\n🔄 Step 1: Pulling latest code..."
git pull origin main

# Step 2: Check if .env exists
echo -e "\n🔍 Step 2: Checking .env file..."
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "Please create .env file with your MongoDB credentials"
    exit 1
else
    echo "✅ .env file exists"
fi

# Step 3: Install/update dependencies
echo -e "\n📦 Step 3: Installing server dependencies..."
npm install

# Step 4: Build client
echo -e "\n🏗️  Step 4: Building React client..."
cd client
npm install
npm run build
cd ..

# Step 5: Stop existing server
echo -e "\n🛑 Step 5: Stopping existing server (if running)..."
pkill -f "server/index.js" 2>/dev/null && echo "✅ Stopped old server" || echo "ℹ️  No server was running"

sleep 2

# Step 6: Start server in background
echo -e "\n🚀 Step 6: Starting server..."
nohup node server/index.js > server.log 2>&1 &
SERVER_PID=$!
echo "✅ Server started (PID: $SERVER_PID)"

# Step 7: Wait and test
echo -e "\n⏳ Step 7: Waiting for server to start..."
sleep 5

# Test API
echo -e "\n🧪 Step 8: Testing API..."
API_TEST=$(curl -s http://localhost:3000/api/services | head -100)
if echo "$API_TEST" | grep -q "success"; then
    echo "✅ API is working!"
    echo "$API_TEST" | grep -o '"count":[0-9]*'
else
    echo "❌ API test failed"
    echo "Check logs: tail -50 server.log"
    exit 1
fi

# Show server logs
echo -e "\n📋 Server logs (last 20 lines):"
tail -20 server.log

echo -e "\n=================================================="
echo "  ✅ SETUP COMPLETE!"
echo "=================================================="
echo ""
echo "Now do these:"
echo "1. Open https://khewracrafts.com"
echo "2. Press Ctrl+Shift+R (hard refresh)"
echo "3. Services should appear!"
echo ""
echo "To check server logs: tail -f server.log"
echo "To stop server: pkill -f 'server/index.js'"
echo "To restart: node server/index.js"
echo ""
echo "=================================================="

#!/bin/bash

# ============================================
# SIMPLE DEPLOYMENT - ONE COMMAND SOLUTION
# ============================================

echo "🚀 Starting VitalBlaze Services Deployment..."
echo ""

# Navigate to project
cd /var/www/vhosts/khewracrafts.com/httpdocs || exit 1

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install server dependencies
echo "📦 Installing server dependencies..."
npm install --production

# Build React client
echo "🏗️  Building React application..."
cd client
npm install
npm run build
cd ..

# Stop any existing server
echo "🛑 Stopping existing server..."
pkill -f "server/index.js" 2>/dev/null && sleep 2

# Start server
echo "🚀 Starting server..."
NODE_ENV=production nohup node server/index.js > server.log 2>&1 &

# Wait for server to start
sleep 5

# Test
echo "🧪 Testing server..."
curl -s http://localhost:3000/api/services | grep -q "success" && echo "✅ Server is running!" || echo "❌ Server failed to start"

echo ""
echo "=================================================="
echo "  ✅ DEPLOYMENT COMPLETE!"
echo "=================================================="
echo ""
echo "Your website: https://khewracrafts.com"
echo "Server logs:  tail -f server.log"
echo ""
echo "✨ Refresh your browser (Ctrl+Shift+R) to see services!"
echo ""

#!/bin/bash

echo "=================================================="
echo "  COMPLETE FIX - VitalBlaze Services"
echo "=================================================="

cd /var/www/vhosts/khewracrafts.com/httpdocs || exit 1

# Step 1: Kill all Node processes
echo -e "\n1️⃣ Stopping all Node.js processes..."
pkill -9 node
sleep 3

# Step 2: Pull latest code
echo -e "\n2️⃣ Pulling latest code..."
git pull origin main

# Step 3: Check .env file
echo -e "\n3️⃣ Checking .env file..."
if [ ! -f ".env" ]; then
    echo "❌ .env file missing!"
    echo "Creating .env template - YOU MUST ADD YOUR MONGODB PASSWORD!"
    cat > .env << 'ENVEOF'
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vitalservices:YOUR_PASSWORD_HERE@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true&w=majority
ADMIN_EMAIL=vitalservices@vitalblaze.com
ADMIN_PASSWORD=vitalservice975312468
SESSION_SECRET=vital-session-2024
JWT_SECRET=vital-jwt-2024
CLIENT_URL=https://khewracrafts.com
ALLOWED_ORIGINS=https://khewracrafts.com,https://www.khewracrafts.com
ENVEOF
    echo "⚠️  Edit .env file NOW and add your MongoDB password!"
    echo "Run: nano .env"
    exit 1
else
    echo "✅ .env file exists"
    if grep -q "YOUR_PASSWORD_HERE" .env; then
        echo "❌ .env still has placeholder password!"
        echo "Edit it: nano .env"
        exit 1
    fi
fi

# Step 4: Install dependencies
echo -e "\n4️⃣ Installing dependencies..."
npm install --production

# Step 5: Build React client
echo -e "\n5️⃣ Building React client..."
cd client
npm install
npm run build
cd ..

# Step 6: Start server
echo -e "\n6️⃣ Starting server..."
NODE_ENV=production nohup node server/index.js > server.log 2>&1 &
SERVER_PID=$!
echo "Server started with PID: $SERVER_PID"

# Step 7: Wait and test
echo -e "\n7️⃣ Waiting for server to start..."
sleep 8

# Step 8: Test localhost
echo -e "\n8️⃣ Testing localhost API..."
LOCALHOST_RESULT=$(curl -s http://localhost:3000/api/services 2>&1)
LOCALHOST_COUNT=$(echo "$LOCALHOST_RESULT" | grep -o '"count":[0-9]*' | grep -o '[0-9]*')
echo "Localhost returns: $LOCALHOST_COUNT services"

if [ -z "$LOCALHOST_COUNT" ] || [ "$LOCALHOST_COUNT" -eq "0" ]; then
    echo "❌ Localhost API failed!"
    echo "Check server logs:"
    tail -30 server.log
    exit 1
fi

# Step 9: Test domain
echo -e "\n9️⃣ Testing domain API..."
DOMAIN_RESULT=$(curl -s https://khewracrafts.com/api/services 2>&1)
DOMAIN_COUNT=$(echo "$DOMAIN_RESULT" | grep -o '"count":[0-9]*' | grep -o '[0-9]*')
echo "Domain returns: $DOMAIN_COUNT services"

# Step 10: Analysis
echo -e "\n🔍 Analysis:"
if [ "$LOCALHOST_COUNT" == "$DOMAIN_COUNT" ]; then
    echo "✅ Both APIs return same count!"
    echo "✅ Backend is working correctly!"
    echo ""
    echo "Now do this:"
    echo "1. Open https://khewracrafts.com in INCOGNITO window"
    echo "2. Or clear browser cache completely"
    echo "3. Services should appear!"
else
    echo "⚠️  Different results:"
    echo "   Localhost: $LOCALHOST_COUNT"
    echo "   Domain: $DOMAIN_COUNT"
    echo ""
    echo "This means Plesk is running a separate Node.js instance."
    echo "You need to either:"
    echo "1. Configure Plesk Node.js environment variables"
    echo "2. Or disable Plesk Node.js and use proxy"
fi

# Step 11: Show server logs
echo -e "\n📋 Server logs (last 20 lines):"
tail -20 server.log

echo -e "\n=================================================="
echo "  Setup Complete!"
echo "=================================================="
echo ""
echo "Server PID: $SERVER_PID"
echo "Localhost API: http://localhost:3000/api/services"
echo "Domain API: https://khewracrafts.com/api/services"
echo "Website: https://khewracrafts.com"
echo ""
echo "To view logs: tail -f server.log"
echo "To stop server: kill $SERVER_PID"
echo ""

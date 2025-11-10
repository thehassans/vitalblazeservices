#!/bin/bash

# Import Services Script
echo "=================================================="
echo "  Importing Services to MongoDB"
echo "=================================================="

cd /var/www/vhosts/khewracrafts.com/httpdocs || exit 1

# Check .env file
echo -e "\n1️⃣ Checking .env file..."
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "Create it first with MongoDB credentials"
    exit 1
else
    echo "✅ .env file exists"
fi

# Check MongoDB URI
echo -e "\n2️⃣ Checking MongoDB URI..."
if grep -q "MONGODB_URI=mongodb" .env; then
    echo "✅ MongoDB URI is configured"
else
    echo "❌ MongoDB URI not found in .env"
    exit 1
fi

# Install dependencies
echo -e "\n3️⃣ Installing dependencies..."
npm install

# Run init-db script
echo -e "\n4️⃣ Running database initialization..."
npm run init-db

# Wait a moment
sleep 2

# Test API
echo -e "\n5️⃣ Testing API..."
RESPONSE=$(curl -s http://localhost:3000/api/services)
COUNT=$(echo "$RESPONSE" | grep -o '"count":[0-9]*' | grep -o '[0-9]*')

if [ -z "$COUNT" ]; then
    echo "❌ API test failed - server may not be running"
    echo "Response: $RESPONSE"
else
    echo "✅ API responding"
    echo "📊 Services in database: $COUNT"
    
    if [ "$COUNT" -gt "0" ]; then
        echo "🎉 SUCCESS! Services are imported!"
    else
        echo "⚠️  Database is still empty"
    fi
fi

echo -e "\n=================================================="
echo "  Complete!"
echo "=================================================="
echo ""
echo "Now refresh your website: https://khewracrafts.com"
echo "Press Ctrl+Shift+R to hard refresh"
echo ""

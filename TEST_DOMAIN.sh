#!/bin/bash

echo "=================================================="
echo "  Testing Domain vs Localhost"
echo "=================================================="

echo -e "\n1️⃣ Test API on localhost (backend):"
curl -s http://localhost:3000/api/services | grep -o '"count":[0-9]*' || echo "❌ Localhost API failed"

echo -e "\n2️⃣ Test API on domain (what browser sees):"
curl -s https://khewracrafts.com/api/services | grep -o '"count":[0-9]*' || echo "❌ Domain API failed"

echo -e "\n3️⃣ Test health endpoint on domain:"
curl -s https://khewracrafts.com/api/health | head -20

echo -e "\n4️⃣ Check server logs (last 20 lines):"
tail -20 /var/www/vhosts/khewracrafts.com/httpdocs/server.log

echo -e "\n=================================================="
echo "  Analysis"
echo "=================================================="

LOCALHOST_COUNT=$(curl -s http://localhost:3000/api/services | grep -o '"count":[0-9]*' | grep -o '[0-9]*')
DOMAIN_COUNT=$(curl -s https://khewracrafts.com/api/services | grep -o '"count":[0-9]*' | grep -o '[0-9]*')

echo "Localhost API returns: $LOCALHOST_COUNT services"
echo "Domain API returns: $DOMAIN_COUNT services"

if [ "$LOCALHOST_COUNT" == "$DOMAIN_COUNT" ] && [ ! -z "$LOCALHOST_COUNT" ]; then
    echo "✅ Both return same data - API is working!"
    echo "⚠️  Problem is in frontend React code"
else
    echo "❌ Different results - domain not reaching Node server"
    echo "🔧 Check Apache/Nginx proxy configuration"
fi

echo -e "\n=================================================="

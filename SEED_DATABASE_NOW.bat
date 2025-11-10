@echo off
echo ================================================
echo  SEEDING MONGODB WITH 18 SERVICES
echo ================================================
echo.
echo This will populate your MongoDB database with:
echo - 18 Services (VPS, Domains, Web Dev, CRM, etc.)
echo - All prices in SAR and GBP
echo - Categories and features
echo.
pause
echo.
echo Starting database seeding...
echo.

npm run seed

echo.
echo ================================================
echo  SEEDING COMPLETE!
echo ================================================
echo.
echo Your MongoDB database now has all services.
echo.
echo Next steps:
echo  1. Start server:  npm run dev
echo  2. Open browser:  http://localhost:3000
echo  3. You should see all 18 services!
echo.
echo For production (Plesk):
echo  - Run the same command on server
echo  - Rebuild client: cd client ^&^& npm run build
echo  - Restart Node.js app in Plesk
echo.
pause

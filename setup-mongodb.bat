@echo off
echo ========================================
echo  VitalServices MongoDB Setup
echo ========================================
echo.

REM Check if .env exists
if exist .env (
    echo [!] .env file already exists
    echo.
    set /p overwrite="Overwrite existing .env? (y/n): "
    if /i not "%overwrite%"=="y" (
        echo Keeping existing .env file
        goto INSTALL
    )
)

echo [1/4] Creating .env file...
(
echo PORT=5000
echo NODE_ENV=development
echo MONGODB_URI=mongodb+srv://vitalservices:vitalblazevitalservice@vitalservices.hgqktr5.mongodb.net/vitalservices?retryWrites=true^&w=majority^&appName=vitalservices
echo ADMIN_USERNAME=admin
echo ADMIN_PASSWORD=vitalservice975312468
echo EMAIL_HOST=smtp.gmail.com
echo EMAIL_PORT=587
echo EMAIL_USER=your-email@gmail.com
echo EMAIL_PASS=your-app-password
echo EMAIL_FROM=noreply@vitalblaze.com
echo EMAIL_TO=info@vitalblaze.com
echo CLIENT_URL=http://localhost:3000
echo ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000
echo SESSION_SECRET=vitalblaze-session-secret-key-2024
echo JWT_SECRET=vitalblaze-jwt-secret-key-2024
) > .env
echo    Done!
echo.

:INSTALL
echo [2/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo    Error: Failed to install dependencies
    pause
    exit /b 1
)
echo    Done!
echo.

echo [3/4] Seeding database...
call npm run seed
if errorlevel 1 (
    echo    Error: Failed to seed database
    echo    Make sure MongoDB connection is working
    pause
    exit /b 1
)
echo    Done!
echo.

echo [4/4] Building client...
cd client
call npm install
cd ..
echo    Done!
echo.

echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo Your VitalServices application is ready!
echo.
echo Next steps:
echo  1. Start dev server:  npm run dev
echo  2. Open browser:      http://localhost:3000
echo  3. Admin panel:       http://localhost:3000/admin
echo.
echo Admin credentials:
echo  Email:    vitalservices@vitalblaze.com
echo  Password: vitalservice975312468
echo.
echo MongoDB Dashboard: https://cloud.mongodb.com
echo.
pause

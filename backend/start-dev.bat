@echo off
echo 🚀 Starting TomeTalk Backend Development Server...
echo.

REM Check if .env file exists
if not exist .env (
    echo ⚠️  Warning: .env file not found
    echo 💡 Creating a sample .env file...
    (
        echo # Server Configuration
        echo PORT=8000
        echo NODE_ENV=development
        echo.
        echo # Database Configuration
        echo MONGODB_URI=mongodb://localhost:27017/tometalk
        echo.
        echo # JWT Configuration
        echo JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex_%RANDOM%
        echo JWT_EXPIRE=7d
        echo.
        echo # CORS Configuration
        echo FRONTEND_URL=http://localhost:8080
    ) > .env
    echo ✅ Sample .env file created. Please update JWT_SECRET with a secure value.
    echo.
)

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Start the development server
echo 🎯 Starting development server on port 8000...
echo 📱 Frontend URL: http://localhost:8080
echo 🌐 API URL: http://localhost:8000
echo 💡 Press Ctrl+C to stop the server
echo.

call npm run dev

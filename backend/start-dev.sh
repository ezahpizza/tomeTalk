#!/bin/bash

# TomeTalk Backend Startup Script

echo "Starting TomeTalk Backend Development Server..."
echo ""

# Check if MongoDB is running
echo "📦 Checking MongoDB connection..."
if ! mongo --eval "db.runCommand('ping').ok" localhost/tometalk --quiet > /dev/null 2>&1; then
    echo "⚠️  Warning: MongoDB doesn't seem to be running on localhost:27017"
    echo "💡 Please make sure MongoDB is running before starting the server"
    echo ""
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found"
    echo "💡 Creating a sample .env file..."
    cat > .env << EOL
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/tometalk

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex_$(date +%s)
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:8080
EOL
    echo "✅ Sample .env file created. Please update JWT_SECRET with a secure value."
    echo ""
fi

# install dependencies 
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the development server
echo "🎯 Starting development server on port 8000..."
echo "📱 Frontend URL: http://localhost:8080"
echo "🌐 API URL: http://localhost:8000"
echo "💡 Press Ctrl+C to stop the server"
echo ""

npm run dev

#!/bin/bash

# Script to run the AMMI project with all services
# This script starts the auth service, backend, and frontend in order

echo "Starting AMMI Project Services..."

# Function to start auth service
start_auth_service() {
    echo "Starting Auth Service on port 3001..."
    cd auth-service
    npm run dev &
    AUTH_PID=$!
    cd ..
    echo "Auth Service started with PID: $AUTH_PID"
}

# Function to start backend
start_backend() {
    echo "Starting Website Backend on port 8001..."
    cd website/backend
    python main.py &
    BACKEND_PID=$!
    cd ../..
    echo "Backend started with PID: $BACKEND_PID"
}

# Function to start frontend
start_frontend() {
    echo "Starting Frontend on port 3000..."
    cd website/frontend
    npm run start
    cd ../..
}

# Check if required services are installed
check_dependencies() {
    if ! command -v node &> /dev/null; then
        echo "Error: Node.js is not installed. Please install Node.js first."
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        echo "Error: npm is not installed. Please install npm first."
        exit 1
    fi

    if ! command -v python3 &> /dev/null; then
        echo "Error: Python 3 is not installed. Please install Python 3 first."
        exit 1
    fi

    if ! command -v pip &> /dev/null; then
        echo "Error: pip is not installed. Please install pip first."
        exit 1
    fi

    echo "All dependencies are installed."
}

# Main execution
check_dependencies

# Start auth service
start_auth_service

# Wait a moment for auth service to start
sleep 3

# Start backend
start_backend

# Wait a moment for backend to start
sleep 5

# Start frontend
echo "Starting Frontend on port 3000..."
echo "Note: The frontend will open in your browser automatically."
start_frontend

# Function to stop all services
cleanup() {
    echo "Stopping all services..."
    kill $AUTH_PID $BACKEND_PID 2>/dev/null
    echo "All services stopped."
}

# Set up cleanup on script exit
trap cleanup EXIT INT TERM
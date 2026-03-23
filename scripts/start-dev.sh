#!/bin/bash

# Portfolio Development Setup Script
# Starts both frontend and backend for local development

set -e

echo "🚀 Starting Portfolio Development Environment..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"
command -v node &> /dev/null || { echo "❌ Node.js is required"; exit 1; }
command -v python3 &> /dev/null || { echo "❌ Python 3 is required"; exit 1; }

echo -e "${GREEN}✓ Prerequisites met${NC}"

# Setup backend
echo -e "${BLUE}🔧 Setting up backend...${NC}"
cd "$(dirname "$0")/backend"

if [ ! -d "venv" ]; then
  echo "Creating Python virtual environment..."
  python3 -m venv venv
fi

source venv/bin/activate
pip install -q -r requirements.txt

# Check .env file
if [ ! -f ".env" ]; then
  echo -e "${YELLOW}⚠️  No .env file found in backend${NC}"
  echo "Creating default .env..."
  cat > .env << 'EOF'
DEBUG=True
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=
SMTP_TO_EMAIL=arjunbojja1@gmail.com
EOF
  echo "📝 Update backend/.env with your email credentials"
fi

echo -e "${GREEN}✓ Backend setup complete${NC}"

# Setup frontend
echo -e "${BLUE}🔧 Setting up frontend...${NC}"
cd "$(dirname "$0")/frontend"

if [ ! -d "node_modules" ]; then
  echo "Installing npm dependencies..."
  npm install -q
fi

echo -e "${GREEN}✓ Frontend setup complete${NC}"

echo ""
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Development environment is ready!${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}To start development:${NC}"
echo "  Backend:  cd backend && source venv/bin/activate && python main.py"
echo "  Frontend: cd frontend && npm start"
echo ""
echo -e "${BLUE}Or use the combined dev command:${NC}"
echo "  npm run dev"
echo ""
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🔧 Backend will be available at: http://localhost:8000"
echo "📚 API docs at: http://localhost:8000/docs (debug mode)"
echo ""

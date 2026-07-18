#!/bin/bash

echo "=== Fixing Vercel Deployment ==="

# Fix client package.json
echo "1. Fixing client package.json..."
cat > client/package.json << 'EOF'
{
  "name": "devas-dental-client",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-router-dom": "^7.18.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.3.1",
    "vite": "^5.4.1"
  }
}
EOF

# Fix server package.json
echo "2. Fixing server package.json..."
cat > server/package.json << 'EOF'
{
  "name": "devas-dental-server",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "db:push": "npx prisma db push",
    "db:studio": "npx prisma studio",
    "db:generate": "npx prisma generate"
  },
  "dependencies": {
    "@prisma/client": "^6.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.0",
    "express": "^4.21.0",
    "pg": "^8.22.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0",
    "prisma": "^6.0.0"
  }
}
EOF

echo "3. Done! Now run:"
echo "   cd client && npm install"
echo "   npm run build"
echo "   vercel --prod"
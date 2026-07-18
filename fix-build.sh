#!/bin/bash
set -e

echo "==== Installing server dependencies ===="
cd "/Users/pramathsrivastava/Downloads/Devas Dental Clinic/server"
npm install --silent

echo "==== Regenerating Prisma client ===="
npx prisma generate --silent

echo "==== Checking server .env ===="
if [ ! -f .env ]; then
  echo "DATABASE_URL=\"postgresql://neondb_owner:npg_dL7Jvmiq6kCP@ep-misty-sky-azbl69x0-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require\"" > .env
  echo "PORT=3001" >> .env
  echo "NODE_ENV=production" >> .env
fi

echo "==== Server setup complete ===="
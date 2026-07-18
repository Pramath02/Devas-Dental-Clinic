const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function installDeps(dir, name) {
  console.log(`\n=== Installing ${name} dependencies ===`);

  try {
    // Remove node_modules and package-lock
    const nodeModules = path.join(dir, 'node_modules');
    const packageLock = path.join(dir, 'package-lock.json');

    if (fs.existsSync(nodeModules)) {
      fs.rmSync(nodeModules, { recursive: true, force: true });
      console.log(`Removed ${name} node_modules`);
    }

    if (fs.existsSync(packageLock)) {
      fs.unlinkSync(packageLock);
      console.log(`Removed ${name} package-lock.json`);
    }

    // npm install
    console.log(`Running npm install for ${name}...`);
    execSync('npm install', {
      cwd: dir,
      stdio: 'inherit',
      env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' }
    });

    console.log(`${name} dependencies installed successfully`);
    return true;
  } catch (err) {
    console.error(`Failed to install ${name}:`, err.message);
    return false;
  }
}

// Install server deps
installDeps('./server', 'server');

// Install client deps
installDeps('./client', 'client');

console.log('\n=== Setup Complete ===');
console.log('\nNext steps:');
console.log('1. cd client && npm run build');
console.log('2. vercel --prod');
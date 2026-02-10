import fs from 'fs';
import path from 'path';

// Helper for cross-platform mkdir -p
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper for cross-platform cp -r (file contents)
function copyDirContent(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Source directory not found (skipping): ${src}`);
    return;
  }
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirContent(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log('Copying contract keys & zkir files...');
  
  const rootDir = process.cwd(); // Assume calling from frontend-vite-react root
  // Resolving path relative to frontend root to get to contract
  const contractSrcBase = path.resolve(rootDir, '../counter-contract/src/managed/counter');
  const publicDestBase = path.resolve(rootDir, './public/midnight/counter');
  
  // Verify contract source exists
  if (!fs.existsSync(contractSrcBase)) {
    console.warn(`Contract managed source not found at: ${contractSrcBase}`);
    console.warn('Skipping key copy. Assuming keys are already present in public/ directory.');
    process.exit(0);
  }

  // paths from package.json:
  // src/managed/counter/keys -> public/midnight/counter/keys
  // src/managed/counter/zkir -> public/midnight/counter/zkir
  
  const srcKeys = path.join(contractSrcBase, 'keys');
  const destKeys = path.join(publicDestBase, 'keys');
  
  const srcZkir = path.join(contractSrcBase, 'zkir');
  const destZkir = path.join(publicDestBase, 'zkir');
  
  console.log(`Copying keys from ${srcKeys} to ${destKeys}`);
  copyDirContent(srcKeys, destKeys);
  
  console.log(`Copying zkir from ${srcZkir} to ${destZkir}`);
  copyDirContent(srcZkir, destZkir);
  
  console.log('Keys copied successfully.');
} catch (error) {
  console.error('Failed to copy keys:', error);
  process.exit(1);
}

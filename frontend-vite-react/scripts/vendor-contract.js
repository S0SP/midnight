import fs from 'fs';
import path from 'path';

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyDirContent(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Source directory not found: ${src}`);
    return false;
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
  return true;
}

try {
  console.log('Vendoring contract code...');
  const rootDir = process.cwd();
  const contractDist = path.resolve(rootDir, '../counter-contract/dist');
  const destDir = path.resolve(rootDir, './src/contract');

  if (copyDirContent(contractDist, destDir)) {
      console.log('Contract code vendored successfully to src/contract');
  } else {
      console.warn('Could not vendor contract code. Build might fail if not already present.');
  }

} catch (error) {
  console.error('Failed to copy contract code:', error);
  process.exit(1);
}

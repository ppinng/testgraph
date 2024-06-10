const fs = require('fs');
const path = require('path');

// Define the directory structure
const directories = [
  path.join(__dirname, 'src', 'lib'),
  path.join(__dirname, 'src', 'components', 'ui')
];

// Create directories if they don't exist
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create utils.ts file with the given content
const utilsFilePath = path.join(__dirname, 'src', 'lib', 'utils.ts');
const utilsFileContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

if (!fs.existsSync(utilsFilePath)) {
  fs.writeFileSync(utilsFilePath, utilsFileContent);
  console.log(`Created file: ${utilsFilePath}`);
}

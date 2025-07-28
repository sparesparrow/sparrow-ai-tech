import fs from 'fs';
import { glob } from 'glob';

const BASE_URL = '/sparrow-ai-tech';

function fixUrlsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  const fixes = [
    // Fix the main malformed pattern
    [/\/sparrow-ai-techen\//g, `${BASE_URL}/en/`],
    [/\/sparrow-ai-techapi\//g, `${BASE_URL}/api/`],
    [/\/sparrow-ai-techassets\//g, `${BASE_URL}/assets/`],
    [/\/sparrow-ai-techfavicon\./g, `${BASE_URL}/favicon.`],
    [/\/sparrow-ai-techmanifest\./g, `${BASE_URL}/manifest.`],
    
    // Fix missing base URLs for internal assets
    [/href="\/assets\//g, `href="${BASE_URL}/assets/`],
    [/src="\/assets\//g, `src="${BASE_URL}/assets/`],
  ];
  
  fixes.forEach(([pattern, replacement]) => {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed URLs in: ${filePath}`);
  }
}

// Find and fix all relevant files
const patterns = [
  'src/**/*.{astro,jsx,js,ts,tsx,html}',
  'dist/**/*.{html,js,css}'
];

for (const pattern of patterns) {
  const files = glob.sync(pattern);
  files.forEach(fixUrlsInFile);
}

console.log('🎉 URL fixing complete!');

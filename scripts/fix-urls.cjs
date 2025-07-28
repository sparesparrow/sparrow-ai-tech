#!/usr/bin/env node
/* eslint-env node */
 
const fs = require('fs');
const { glob } = require('glob');

const BASE_URL = '/sparrow-ai-tech';

function fixUrlsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  const fixes = [
    // Oprava hlavních malformed vzorů
    [/\/sparrow-ai-techinfographics\//g, `${BASE_URL}/infographics/`],
    [/\/sparrow-ai-techen\//g, `${BASE_URL}/en/`],
    [/\/sparrow-ai-techapi\//g, `${BASE_URL}/api/`],
    [/\/sparrow-ai-techassets\//g, `${BASE_URL}/assets/`],
    [/\/sparrow-ai-techfavicon\./g, `${BASE_URL}/favicon.`],
    [/\/sparrow-ai-techmanifest\./g, `${BASE_URL}/manifest.`],
    
    // Oprava duplikovaných assets cest
    [/\/sparrow-ai-tech\/assets\/assets\//g, `${BASE_URL}/assets/`],
    [/\/assets\/assets\//g, '/assets/'],
    
    // Oprava relativních cest
    [/href="\/assets\//g, `href="${BASE_URL}/assets/`],
    [/src="\/assets\//g, `src="${BASE_URL}/assets/`],
    [/href="\/infographics\//g, `href="${BASE_URL}/infographics/`],
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

async function main() {
  const patterns = [
    'dist/**/*.html',
    'dist/**/*.css',
    'dist/**/*.js',
    'src/**/*.{astro,jsx,js,ts,tsx,html}',
  ];
  
  for (const pattern of patterns) {
    try {
      const files = await glob(pattern);
      files.forEach(fixUrlsInFile);
    } catch (err) {
      console.log(`Skipping pattern ${pattern}: ${err.message}`);
    }
  }
  
  console.log('🎉 URL fixing complete!');
}

main().catch(console.error);

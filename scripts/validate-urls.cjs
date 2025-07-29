#!/usr/bin/env node
/* eslint-env node, commonjs */

const fs = require('fs');
const { glob } = require('glob');

console.log('🔍 Validating URLs in dist files...');

const problematicPatterns = [
  /\/sparrow-ai-techen\//g,
  /\/sparrow-ai-techapi\//g,
  /\/sparrow-ai-techassets\//g,
  /\/sparrow-ai-techfavicon\./g,
  /\/sparrow-ai-techmanifest\./g
];

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let hasIssues = false;
  
  problematicPatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      console.log(`❌ Found problematic URLs in ${filePath}:`);
      matches.forEach(match => console.log(`   - ${match}`));
      hasIssues = true;
    }
  });
  
  if (!hasIssues) {
    console.log(`✅ ${filePath} - OK`);
  }
  
  return !hasIssues;
}

const files = glob.sync('dist/**/*.{html,js,css}');
console.log(`Checking ${files.length} files...\n`);

let allGood = true;
files.forEach(file => {
  if (!validateFile(file)) {
    allGood = false;
  }
});

console.log(allGood ? '\n🎉 All URLs are properly formatted!' : '\n⚠️ Some URLs need fixing.');

#!/usr/bin/env node
/* eslint-env node, commonjs */
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const { glob } = require('glob');

console.log('🔍 Validating URLs in dist files...');

const problematicPatterns = [
  { pattern: /\/sparrow-ai-techen\//g, description: 'Malformed language prefix' },
  { pattern: /\/sparrow-ai-techapi\//g, description: 'Malformed API path' },
  { pattern: /\/sparrow-ai-techassets\//g, description: 'Malformed assets path' },
  { pattern: /\/sparrow-ai-techfavicon\./g, description: 'Malformed favicon path' },
  { pattern: /\/sparrow-ai-techmanifest\./g, description: 'Malformed manifest path' },
  { pattern: /\/assets\/assets\//g, description: 'Duplicate assets in path' },
  { pattern: /\/sparrow-ai-techinfographics\//g, description: 'Malformed infographics path' }
];

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let hasIssues = false;
  
  problematicPatterns.forEach(({ pattern, description }) => {
    const matches = content.match(pattern);
    if (matches) {
      if (!hasIssues) {
        console.log(`❌ Found issues in ${filePath}:`);
        hasIssues = true;
      }
      console.log(`   • ${description}: ${matches.length} occurrence(s)`);
      matches.slice(0, 3).forEach(match => console.log(`     - ${match}`));
      if (matches.length > 3) {
        console.log(`     ... and ${matches.length - 3} more`);
      }
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
let totalFiles = 0;
let problemFiles = 0;

files.forEach(file => {
  totalFiles++;
  if (!validateFile(file)) {
    allGood = false;
    problemFiles++;
  }
});

console.log(`\n📊 Validation Summary:`);
console.log(`   • Total files checked: ${totalFiles}`);
console.log(`   • Files with issues: ${problemFiles}`);
console.log(`   • Clean files: ${totalFiles - problemFiles}`);

console.log(allGood ? '\n🎉 All URLs are properly formatted!' : '\n⚠️ Some URLs need fixing.');

if (!allGood) {
  console.log('\n💡 Run "npm run fix-urls" to fix these issues automatically.');
}

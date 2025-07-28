#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const { glob } = require('glob');

const BASE_URL = '/sparrow-ai-tech';

function fixUrlsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  const fixes = [
    // Fix the main malformed pattern - kritické opravy
    [/\/sparrow-ai-techen\//g, `${BASE_URL}/en/`],
    [/\/sparrow-ai-techapi\//g, `${BASE_URL}/api/`],
    [/\/sparrow-ai-techassets\//g, `${BASE_URL}/assets/`],
    [/\/sparrow-ai-techfavicon\./g, `${BASE_URL}/favicon.`],
    [/\/sparrow-ai-techmanifest\./g, `${BASE_URL}/manifest.`],
    
    // Fix missing base URLs for internal assets
    [/href="\/assets\//g, `href="${BASE_URL}/assets/`],
    [/src="\/assets\//g, `src="${BASE_URL}/assets/`],
    [/href="\/infographics\//g, `href="${BASE_URL}/infographics/`],
    [/href="\/MarkdownTest/g, `href="${BASE_URL}/MarkdownTest`],
    [/href="\/mermaid-editor/g, `href="${BASE_URL}/mermaid-editor`],
    [/href="\/agentic-workflow/g, `href="${BASE_URL}/agentic-workflow`],
    [/href="\/todo/g, `href="${BASE_URL}/todo`],
    [/href="\/security/g, `href="${BASE_URL}/security`],
    [/href="\/test/g, `href="${BASE_URL}/test`],
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
  'dist/**/*.{html,js,css}'
];

async function fixAllUrls() {
  for (const pattern of patterns) {
    try {
      const files = glob.sync(pattern);
      console.log(`🔍 Processing ${files.length} files matching ${pattern}`);
      files.forEach(fixUrlsInFile);
    } catch (error) {
      console.warn(`⚠️ Pattern ${pattern} failed:`, error.message);
    }
  }
  console.log('🎉 URL fixing complete!');
}

fixAllUrls();

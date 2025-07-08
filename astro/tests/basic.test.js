import { test, expect } from '@playwright/test';

test('homepage loads and renders React app', async ({ page }) => {
  await page.goto('/sparrow-ai-tech/');
  await expect(page.locator('text=Sparrow AI & Tech')).toBeVisible();
  await expect(page.locator('text=Strategic Blueprint')).toBeVisible();
});

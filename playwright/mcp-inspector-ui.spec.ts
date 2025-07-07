import { test, expect } from '@playwright/test';

test.describe('MCP Inspector UI', () => {
  test('should load the Inspector web UI and show root element', async ({ page }) => {
    await page.goto('http://localhost:6274');
    await expect(page.locator('#root')).toBeVisible();
    await expect(page).toHaveTitle(/MCP Inspector/i);
  });
});

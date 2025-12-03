import { test, expect } from '@playwright/test';

test.describe('Company Detail Page', () => {
  test('should display company name and description for company 1', async ({
    page,
  }) => {
    await page.goto('/1');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that company name is displayed (it should be in an h3)
    const heading = page.locator('h3');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('OKEA');

    // Check that description is displayed
    const description = page.locator('p');
    await expect(description).toBeVisible();
  });

  test('should handle different company IDs', async ({ page }) => {
    // Test with company ID 2
    await page.goto('/2');
    await page.waitForLoadState('networkidle');

    const heading = page.locator('h3');
    await expect(heading).toBeVisible();
  });
});

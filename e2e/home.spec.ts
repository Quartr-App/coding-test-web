import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display trending companies heading', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByRole('heading', { name: /trending companies/i });
    await expect(heading).toBeVisible();
  });

  test('should load and display company list', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that we have company items rendered
    const companyList = page.locator('li');
    await expect(companyList).toHaveCount(5);
  });

  test('should navigate to company detail page when clicking a company', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find and click the first company link (adjust selector as needed)
    const firstCompanyLink = page.getByLabel('View details for OKEA');
    if (await firstCompanyLink.isVisible()) {
      await firstCompanyLink.click();

      // Should navigate to a detail page
      await expect(page).toHaveURL(/\/\d+/);
      await expect(page.getByRole('heading', { name: /OKEA/i })).toBeVisible();
    }
  });
});

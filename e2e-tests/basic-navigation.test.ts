import { test, expect } from '@playwright/test';

test.describe('Basic Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Sol-arium/);
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('can navigate to marketplace page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /marketplace/i }).click();
    await expect(page).toHaveURL(/.*marketplace/);
  });

  test('can navigate to quick-swap page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /quick.?swap/i }).click();
    await expect(page).toHaveURL(/.*quick-swap/);
  });

  test('can navigate to login page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /login/i }).click();
    await expect(page).toHaveURL(/.*login/);
  });

  test('header navigation works on mobile viewport', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 480, height: 720 });
    await page.goto('/');
    
    // Open mobile menu
    await page.getByRole('button', { name: /menu/i }).click();
    
    // Check if menu is visible
    await expect(page.locator('nav')).toBeVisible();
    
    // Navigate to marketplace
    await page.getByRole('link', { name: /marketplace/i }).click();
    await expect(page).toHaveURL(/.*marketplace/);
  });
});

test.describe('Theme Switching', () => {
  test('can switch between light and dark themes', async ({ page }) => {
    await page.goto('/');
    
    // Get the theme switcher
    const themeSwitcher = page.getByRole('button', { name: /toggle theme/i });
    
    // Check initial theme (assuming light theme default)
    await expect(page.locator('html')).toHaveAttribute('class', /light/);
    
    // Toggle to dark theme
    await themeSwitcher.click();
    await expect(page.locator('html')).toHaveAttribute('class', /dark/);
    
    // Toggle back to light theme
    await themeSwitcher.click();
    await expect(page.locator('html')).toHaveAttribute('class', /light/);
  });
});

test.describe('Error Handling', () => {
  test('not-found page shows 404', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expect(page.locator('h1')).toContainText(/not found/i);
  });
});

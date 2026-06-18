import { expect, test } from "@playwright/test";

test("loads the configured application", async ({ page }) => {
  await page.goto(process.env.BASE_URL || "https://example.com");

  await expect(page).toHaveTitle(/.+/);
});

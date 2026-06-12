import { expect, test } from "@playwright/test";

test.describe("Hiremind smoke checks", () => {
  test("loads the application", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/.+/);
  });
});

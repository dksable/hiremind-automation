import { test, expect } from "@playwright/test";

test.describe("functional generated test plan", () => {
  test("Access User Management Page as Admin", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel(/requirement|user story/i).fill("**Jira Story: User Management Page** **Title:** User Management Page for Admin Access Control **Description:**");
    await page.getByRole("button", { name: /generate/i }).click();

    await expect(page.getByText(/Generated Test Plan/i)).toBeVisible();
    await expect(page.getByText("TC-P-01")).toBeVisible();
  });

  test("View Team Members", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel(/requirement|user story/i).fill("**Jira Story: User Management Page** **Title:** User Management Page for Admin Access Control **Description:**");
    await page.getByRole("button", { name: /generate/i }).click();

    await expect(page.getByText(/Generated Test Plan/i)).toBeVisible();
    await expect(page.getByText("TC-P-02")).toBeVisible();
  });

  test("Add New User with Valid Details", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel(/requirement|user story/i).fill("**Jira Story: User Management Page** **Title:** User Management Page for Admin Access Control **Description:**");
    await page.getByRole("button", { name: /generate/i }).click();

    await expect(page.getByText(/Generated Test Plan/i)).toBeVisible();
    await expect(page.getByText("TC-P-03")).toBeVisible();
  });

  test("shows validation when requirement is missing", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /generate/i }).click();

    await expect(page.getByText(/at least 10 characters/i)).toBeVisible();
  });
});
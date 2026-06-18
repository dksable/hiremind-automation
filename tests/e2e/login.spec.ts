import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { loginData } from "../../test-data/loginData";

test.describe("Login page", () => {
  test.skip(!process.env.BASE_URL, "BASE_URL is required to run Login page tests.");

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("shows login form fields and sign in button", async () => {
    await loginPage.expectLoaded();
  });

  test("validates required email field", async () => {
    await loginPage.emailInput.fill("");
    await loginPage.passwordInput.fill(loginData.validUser.password);
    await loginPage.submit();

    await expect(loginPage.emailInput).toBeFocused();
    expect(await loginPage.getEmailValidationMessage()).toContain(loginData.messages.requiredField);
  });

  test("validates required password field", async () => {
    await loginPage.emailInput.fill(loginData.validUser.email);
    await loginPage.passwordInput.fill("");
    await loginPage.submit();

    await expect(loginPage.passwordInput).toBeFocused();
    expect(await loginPage.getPasswordValidationMessage()).toContain(loginData.messages.requiredField);
  });

  test("validates invalid email format", async () => {
    await loginPage.emailInput.fill(loginData.invalidEmailFormat);
    await loginPage.passwordInput.fill(loginData.validUser.password);
    await loginPage.submit();

    await expect(loginPage.emailInput).toBeFocused();
    expect(await loginPage.getEmailValidationMessage()).toContain(loginData.messages.invalidEmailFormat);
  });

  test("shows error for invalid credentials", async () => {
    await loginPage.login(loginData.invalidUser.email, loginData.invalidUser.password);

    await expect(loginPage.invalidLoginMessage).toBeVisible();
    await expect(loginPage.page).toHaveURL(/\/login/);
  });

  test("logs in with valid credentials", async ({ page }) => {
    await loginPage.login(loginData.validUser.email, loginData.validUser.password);

    await expect(page).not.toHaveURL(/\/login/);
  });
});

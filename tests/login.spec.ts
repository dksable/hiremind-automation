import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { loginData } from "../test-data/loginData";

test.describe("Login Page", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.clearSession();
    await loginPage.expectLoginFormVisible();
  });

  test("logs in successfully with valid email and password", async ({ page }) => {
    await loginPage.gotoProtectedDashboard();
    await loginPage.expectLoginFormVisible();

    await loginPage.login(loginData.validUser.email, loginData.validUser.password);

    await loginPage.expectDashboardVisible();
    await expect(page.getByRole("heading", { name: loginData.expectedMessages.dashboardHeading })).toBeVisible();
  });

  test("shows an error for invalid email and valid password", async () => {
    const { email, password } = loginData.invalidUsers.invalidEmailValidPassword;

    await loginPage.login(email, password);

    await loginPage.expectInvalidCredentialsMessage();
    await expect(loginPage.page).toHaveURL(/\/login/);
  });

  test("shows an error for valid email and invalid password", async () => {
    const { email, password } = loginData.invalidUsers.validEmailInvalidPassword;

    await loginPage.login(email, password);

    await loginPage.expectInvalidCredentialsMessage();
    await expect(loginPage.page).toHaveURL(/\/login/);
  });

  test("shows an error for invalid email and invalid password", async () => {
    const { email, password } = loginData.invalidUsers.invalidEmailInvalidPassword;

    await loginPage.login(email, password);

    await loginPage.expectInvalidCredentialsMessage();
    await expect(loginPage.page).toHaveURL(/\/login/);
  });

  test("requires email when email is empty", async () => {
    await loginPage.fillEmail("");
    await loginPage.fillPassword(loginData.validUser.password);
    await loginPage.submit();

    await expect(loginPage.emailInput).toBeFocused();
    expect(await loginPage.getEmailValidationMessage()).toContain(loginData.expectedMessages.requiredField);
  });

  test("requires password when password is empty", async () => {
    await loginPage.fillEmail(loginData.validUser.email);
    await loginPage.fillPassword("");
    await loginPage.submit();

    await expect(loginPage.passwordInput).toBeFocused();
    expect(await loginPage.getPasswordValidationMessage()).toContain(loginData.expectedMessages.requiredField);
  });

  test("requires email and password when both are empty", async () => {
    await loginPage.fillEmail("");
    await loginPage.fillPassword("");
    await loginPage.submit();

    await expect(loginPage.emailInput).toBeFocused();
    expect(await loginPage.getEmailValidationMessage()).toContain(loginData.expectedMessages.requiredField);
  });

  test("validates invalid email format", async () => {
    const { email, password } = loginData.invalidUsers.invalidEmailFormat;

    await loginPage.fillEmail(email);
    await loginPage.fillPassword(password);
    await loginPage.submit();

    await expect(loginPage.emailInput).toBeFocused();
    expect(await loginPage.getEmailValidationMessage()).toContain(loginData.expectedMessages.invalidEmailFormat);
  });

  test("shows email field, password field, and login button", async () => {
    await loginPage.expectLoginFormVisible();
  });

  test("supports password show/hide toggle when available", async () => {
    await loginPage.expectPasswordToggleWorksIfAvailable();
  });
});

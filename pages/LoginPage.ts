import { expect, test, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly dashboardHeading: Locator;
  readonly errorToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: /sign in|login/i });
    this.dashboardHeading = page.getByRole("heading", { name: "Dashboard" });
    this.errorToast = page.getByText(/invalid email or password|email and password are required/i);
  }

  async goto() {
    await this.page.goto("/login");
  }

  async gotoProtectedDashboard() {
    await this.page.goto("/dashboard");
  }

  async clearSession() {
    await this.page.context().clearCookies();
    await this.page.goto("/login");
    await this.page.evaluate(() => localStorage.clear());
    await this.page.goto("/login");
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async submit() {
    await this.loginButton.click();
  }

  async expectLoginFormVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async expectDashboardVisible() {
    await expect(this.page).toHaveURL(/\/($|dashboard)/);
    await expect(this.dashboardHeading).toBeVisible();
  }

  async expectInvalidCredentialsMessage() {
    await expect(this.errorToast).toBeVisible();
  }

  async getEmailValidationMessage() {
    return this.emailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
  }

  async getPasswordValidationMessage() {
    return this.passwordInput.evaluate((input: HTMLInputElement) => input.validationMessage);
  }

  async findPasswordToggle() {
    const toggle = this.page
      .getByRole("button", { name: /show password|hide password|show|hide/i })
      .or(this.page.getByTestId(/password-toggle|show-password|hide-password/i))
      .first();

    return (await toggle.count()) > 0 ? toggle : null;
  }

  async expectPasswordToggleWorksIfAvailable() {
    const toggle = await this.findPasswordToggle();

    if (!toggle) {
      // The current Login UI has no show/hide control; keep this POM ready for that enhancement.
      test.info().annotations.push({
        type: "info",
        description: "Password show/hide toggle is not available on the current Login page."
      });
      return;
    }

    await expect(this.passwordInput).toHaveAttribute("type", "password");
    await toggle.click();
    await expect(this.passwordInput).toHaveAttribute("type", "text");
    await toggle.click();
    await expect(this.passwordInput).toHaveAttribute("type", "password");
  }
}

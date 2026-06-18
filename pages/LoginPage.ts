import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly invalidLoginMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.invalidLoginMessage = page.getByText(/invalid email or password/i);
  }

  async goto() {
    await this.page.goto("/login");
  }

  async expectLoaded() {
    await expect(this.page.getByText("Sign in to access your dashboard")).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async submit() {
    await this.signInButton.click();
  }

  async getEmailValidationMessage() {
    return this.emailInput.evaluate((input: HTMLInputElement) => input.validationMessage);
  }

  async getPasswordValidationMessage() {
    return this.passwordInput.evaluate((input: HTMLInputElement) => input.validationMessage);
  }
}

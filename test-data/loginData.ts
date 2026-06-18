export const loginData = {
  validUser: {
    email: process.env.TEST_USER_EMAIL || "admin@demo.com",
    password: process.env.TEST_USER_PASSWORD || "admin123"
  },
  invalidUser: {
    email: "invalid.user@example.com",
    password: "wrong-password"
  },
  invalidEmailFormat: "invalid-email-format",
  messages: {
    loginHeading: "AI Screener",
    signInDescription: "Sign in to access your dashboard",
    invalidCredentials: "Invalid email or password",
    requiredField: "Please fill out this field.",
    invalidEmailFormat: "Please include an '@' in the email address."
  }
} as const;

export const loginData = {
  validUser: {
    email: process.env.LOGIN_EMAIL || "admin@demo.com",
    password: process.env.LOGIN_PASSWORD || "admin123"
  },
  invalidUsers: {
    invalidEmailValidPassword: {
      email: "invalid.user@example.com",
      password: process.env.LOGIN_PASSWORD || "admin123"
    },
    validEmailInvalidPassword: {
      email: process.env.LOGIN_EMAIL || "admin@demo.com",
      password: "wrong-password"
    },
    invalidEmailInvalidPassword: {
      email: "invalid.user@example.com",
      password: "wrong-password"
    },
    invalidEmailFormat: {
      email: "invalid-email-format",
      password: process.env.LOGIN_PASSWORD || "admin123"
    }
  },
  expectedMessages: {
    dashboardHeading: "Dashboard",
    invalidCredentials: "Invalid email or password",
    requiredField: "Please fill out this field.",
    invalidEmailFormat: "Please include an '@' in the email address."
  }
} as const;

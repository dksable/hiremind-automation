# Hiremind Automation

Playwright TypeScript automation framework for Hiremind, organized with the Page Object Model.

## Folder Structure

```text
├── tests/
│   ├── e2e/
│   │   └── smoke.spec.ts
│   └── login.spec.ts
├── pages/
│   └── LoginPage.ts
├── fixtures/
├── utils/
├── test-data/
│   └── loginData.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Prerequisites

- Node.js installed
- Hiremind frontend running locally, usually at `http://localhost:5173`
- Hiremind backend running locally, usually at `http://localhost:4000`
- Valid login credentials seeded in the backend

Default credentials used by the login tests:

```text
admin@demo.com / admin123
```

Override credentials when needed:

```bash
LOGIN_EMAIL="admin@demo.com" LOGIN_PASSWORD="admin123" npm test
```

## Setup

```bash
npm install
npx playwright install chromium
```

## Run Tests

Run all tests in headless Chromium:

```bash
npm test
```

Run tests in headed Chromium:

```bash
npm run test:headed
```

Run Playwright UI mode:

```bash
npm run test:ui
```

Type-check the framework:

```bash
npm run lint
```

Open the latest HTML report:

```bash
npm run report
```

## Environment

The default test base URL is:

```text
http://localhost:5173
```

Override it when needed:

```bash
BASE_URL="https://your-app-url.example" npm test
```

## Framework Features

- Page Object Model
- Chromium execution
- HTML reports
- Screenshots on failure
- Videos retained on failure
- Trace collection on retry
- No hardcoded waits
- Test data separated from specs

## Adding New Modules

For ATS areas such as Dashboard, Jobs, Candidates, Pipeline, Interview, and Settings:

1. Add a page object in `pages/`, for example `DashboardPage.ts`.
2. Store reusable data in `test-data/`.
3. Add shared setup or custom fixtures in `fixtures/`.
4. Add helpers in `utils/`.
5. Add specs in `tests/`.

Prefer accessible selectors such as `getByRole`, `getByLabel`, and `getByTestId`.

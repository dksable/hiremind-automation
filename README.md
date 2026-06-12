# ATS POC Playwright Automation

This folder contains a scalable Playwright automation framework for the ATS POC, written in TypeScript and organized with the Page Object Model.

## Folder Structure

```text
automation/
├── tests/
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
- ATS frontend running locally, usually at `http://localhost:5173`
- ATS backend running locally, usually at `http://localhost:4000`
- Valid login credentials seeded in the backend

Default credentials used by the tests:

```text
admin@demo.com / admin123
```

You can override them with environment variables:

```bash
LOGIN_EMAIL="admin@demo.com" LOGIN_PASSWORD="admin123" npm test
```

## Install Dependencies

From the `automation` folder:

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

Open the latest HTML report:

```bash
npm run report
```

## Configuration

The default test base URL is:

```text
http://localhost:5173
```

Override it when needed:

```bash
BASE_URL="https://your-ats-url.example" npm test
```

The framework is configured to:

- Run on Chromium
- Generate HTML reports
- Capture screenshots on failure
- Retain videos on failure
- Enable trace collection on retry
- Avoid hardcoded waits

## Adding New Modules

For new ATS areas such as Dashboard, Jobs, Candidates, Pipeline, Interview, and Settings:

1. Add a page object in `pages/`, for example `DashboardPage.ts`.
2. Store reusable data in `test-data/`.
3. Add shared setup or custom fixtures in `fixtures/`.
4. Add helpers in `utils/`.
5. Add specs in `tests/`.

Keep selectors accessible-first by preferring `getByRole`, `getByLabel`, and `getByTestId`.

# Hiremind Automation

Playwright automation repository for Hiremind.

## Tech Stack

- Playwright
- TypeScript
- Node.js

## Setup

```bash
npm install
npx playwright install
```

## Run Tests

```bash
npm test
```

Run headed:

```bash
npm run test:headed
```

Open Playwright report:

```bash
npm run report
```

## Environment

Set the application URL with:

```bash
BASE_URL=https://your-app-url.com
```

If `BASE_URL` is not provided, tests use `http://localhost:3000`.

# Hiremind Automation

This repository contains the Playwright automation framework used by AI QA Copilot to validate generated test updates for Hiremind.

AI QA Copilot can push generated Playwright tests into this repository, trigger GitHub Actions validation, read pass/fail results, and create pull requests with test changes.

## Local Setup

```bash
npm install
npx playwright install
```

## Run Tests Locally

Run all tests:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Open the HTML report:

```bash
npm run test:report
```

## GitHub Actions Validation

The `Playwright Validation` workflow runs when:

- It is manually triggered with `workflow_dispatch`
- Code is pushed to branches that start with `aiqa/`

The workflow:

- Checks out the repository
- Sets up Node.js 20
- Installs dependencies using `npm ci` when `package-lock.json` exists, otherwise `npm install`
- Installs Playwright browsers
- Runs Playwright tests
- Uploads `playwright-report`
- Uploads `test-results`

The workflow does not run automatically for normal `main` branch pushes.

## Environment Variables

Create a local `.env` file if needed. Do not commit real secrets.

```env
BASE_URL=https://example.com
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
```

`BASE_URL` is optional for the sample smoke test. If it is not set, the smoke test uses `https://example.com`.

## Folder Structure

```text
.github/workflows/playwright-validation.yml
fixtures/
pages/
tests/
utils/
.env.example
.gitignore
package.json
playwright.config.ts
README.md
```

## Notes for AI QA Copilot

- Add generated specs under `tests/`.
- Add Page Object Model files under `pages/`.
- Add shared setup under `fixtures/`.
- Add reusable helpers under `utils/`.
- Do not commit `.env` files or real credentials.

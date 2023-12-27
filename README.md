# Automation_Framework

## Overview

`Automation_Framework` is a robust testing solution for automated end-to-end testing of web applications, specifically designed for the `www.saucedemo.com` platform. It utilizes Puppeteer for browser automation, allowing tests to run in a headless Chrome environment, and Jest for organizing tests into suites and managing the test lifecycle.

## Features

- **Puppeteer Integration:** Simulates user interactions with web applications in a Chrome browser environment.
- **Jest as Test Runner:** Structures tests into suites and provides powerful assertions, mocks, and hooks.
- **Page Object Model (POM):** Adopts POM for maintainable and readable test code.
- **Data-Driven Approach:** Maintains test data separately for scalability and manageability.
- **Screenshot Utility:** Captures screenshots for test evidence and debugging, organized into specific categories.
- **Comprehensive Test Suites:** Contains tests for login, home page functionality, and plans to extend to complete checkout process testing.
- **Test Reports:** Generates detailed test reports post-execution, aiding in result analysis.

## Project Structure

- `config/`: Configurations for the Puppeteer and Jest setup.
- `node_modules/`: NPM packages required by the project.
- `reports/`: Generated test reports for each test execution.
- `screenshots/`: Categorized screenshots, especially useful for capturing the state of the application at the time of test failure.
- `setup/`: Setup and teardown scripts to prepare and clean up the test environment.
- `src/`: The main source directory containing:
  - `data/`: JSON files (`homeData.json`, `loginData.json`) with data for different test scenarios.
  - `pages/`: Page objects (`basePage.js`, `homePage.js`, `loginPage.js`) to interact with the application.
  - `utils/`: Utility scripts (`testUtils.js`) to support various testing activities.
- `tests/`: Test suites (`home.test.js`, `login.test.js`) for the application.
- `.gitignore`: List of files and folders to ignore in version control.
- `package.json` & `package-lock.json`: Project dependencies and their locked versions.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository.
2. Navigate to the project directory and run `npm install` to install dependencies.

### Running Tests

Execute the tests with the following command:
```sh
npm test
```

## Planned Additions

- **Complete Checkout Process Testing:** We plan to add tests that will cover the entire checkout process, ensuring all steps from cart to final order confirmation are functioning correctly.
- **Extended Test Coverage:** Future tests will include payment workflows, and more.
- **Enhanced Reporting:** Improvements in reporting to include more comprehensive analytics and insights into test executions.

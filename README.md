# JS Starter Template

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md) [![Build Status](https://github.com/ioncakephper/js-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/ioncakephper/js-starter/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/ioncakephper/js-starter/branch/main/graph/badge.svg)](https://codecov.io/gh/ioncakephper/js-starter) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A robust starter template for modern Node.js development, pre-configured with Jest for testing, ESLint for linting, and Prettier for code formatting.

This project provides a solid foundation for building high-quality JavaScript applications, ensuring code consistency and best practices from the start.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## 📚 Table of Contents

- [✨ Key Features](#-key-features)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [🚀 Available Scripts](#-available-scripts)
- [A Focus on Quality and Productivity](#a-focus-on-quality-and-productivity)
  - [The Cost of Stale Documentation](#the-cost-of-stale-documentation)
  - [The Power of Workflow Scripts](#the-power-of-workflow-scripts)
- [📁 Project Structure](#-project-structure)
- [✍️ Linting for Documentation](#-linting-for-documentation)
  - [How to Check for Missing Documentation](#how-to-check-for-missing-documentation)
  - [Example](#example)
- [🤝 Contributing](#-contributing)
- [⚖️ Code of Conduct](#-code-of-conduct)
- [🙏 Acknowledgements](#-acknowledgements)
- [📄 License](#-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ✨ Key Features

- **Testing with Jest**: A complete testing framework for unit and integration tests, with coverage reports enabled.
- **Linting with ESLint & Prettier**: A strict, pre-configured setup to catch errors, enforce best practices, and maintain a consistent code style across all files (`.js`, `.md`, `.json`).
- **JSDoc Enforcement**: Integrated `eslint-plugin-jsdoc` to ensure all functions are documented, improving code clarity and maintainability from the start.
- **Always-Accurate Documentation**: Custom scripts (`npm run docs:all`) automatically generate the project structure, a table of contents, and a list of available scripts. This prevents documentation drift and saves hours of tedious manual updates.
- **Commit-Ready with One Command**: A single `npm run ready` command formats, lints, and updates all documentation, ensuring every commit is clean, consistent, and professional.
- **Sensible Defaults**: Pre-configured with `.gitignore`, `.prettierignore`, and a CI workflow for GitHub Actions.

## 🚀 Getting Started

### Prerequisites

- Node.js version 18.0.0 or higher.

### Installation

1. Clone the repository or use it as a template on GitHub.
2. Navigate to the project directory and install the dependencies:

   ```bash
   npm install
   ```

## 🚀 Available Scripts

This template includes a set of scripts designed to streamline development, enforce quality, and automate documentation.

<!-- START AVAILABLE SCRIPTS -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN npm run docs:scripts TO UPDATE -->

### Automated Documentation

- `npm run docs:all`: A convenience script that updates the table of contents, available scripts, and project structure in the README.
- `npm run docs:scripts`: Updates the "Available Scripts" section in `README.md` with this script.
- `npm run docs:structure`: Updates the project structure tree in `README.md`.
- `npm run toc`: Generates a Table of Contents in `README.md` using `doctoc`.

### Code Quality & Formatting

- `npm run check`: A convenience script that runs the linter.
- `npm run fix`: A convenience script that formats code and then fixes lint issues.
- `npm run format`: Formats all JavaScript, Markdown, and JSON files with Prettier.
- `npm run lint`: Lints all JavaScript and Markdown files using ESLint.
- `npm run lint:fix`: Automatically fixes linting issues in all JavaScript and Markdown files.

### Core Development

- `npm run start`: Runs the application using `node src/index.js`.
- `npm run test`: Runs all tests with Jest and generates a coverage report.
- `npm run test:watch`: Runs Jest in watch mode, re-running tests on file changes.

### The "One-Click" Pre-Commit Workflow

- `npm run ready`: A convenience script to run before committing: updates all documentation and then formats and fixes all files.

<!-- END AVAILABLE SCRIPTS -->

## A Focus on Quality and Productivity

This starter template is more than just a collection of files; it's a workflow designed to maximize developer productivity and enforce high-quality standards from day one. The core philosophy is to **automate the tedious and error-prone tasks** so you can focus on what matters: building great software.

### The Cost of Stale Documentation

In many projects, the `README.md` is the first thing to become outdated. Manually updating the project structure diagram or the list of available scripts is a chore that is easily forgotten. A stale README misleads new contributors and creates a perception of a poorly maintained project.

`js-starter` solves this problem with its custom documentation scripts:

- `scripts/update-readme-structure.js`: Saves you from manually drawing out file trees. What might take 5-10 minutes of careful, manual work (and is often forgotten) is now an instant, accurate, and repeatable command.
- `scripts/update-readme-scripts.js`: Ensures that your project's capabilities are always documented. It reads directly from `package.json`, so the documentation can't lie. It even reminds you to describe your scripts, promoting good habits.

### The Power of Workflow Scripts

Chaining commands together is a simple but powerful concept. The `fix`, `docs:all`, and `ready` scripts are designed to create a seamless development experience.

- Instead of remembering to run `prettier` then `eslint --fix`, you just run `npm run fix`.
- Instead of running three separate documentation commands, you just run `npm run docs:all`.
- And most importantly, before you commit, you run `npm run ready`. This single command is your pre-flight check. It guarantees that every commit you push is not only functional but also perfectly formatted, linted, and documented. This discipline saves countless hours in code review and prevents messy commit histories.

By embracing this automation, `js-starter` helps you build better software, faster.

## 📁 Project Structure

<!-- START PROJECT STRUCTURE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN `npm run docs:structure` TO UPDATE -->

```plaintext
.
├── .github/           # GitHub Actions workflows
│   └── workflows/
│       └── ci.yml # Continuous Integration (CI) workflow
├── src/               # Source code
│   └── index.js # Main application entry point
├── tests/
│   └── index.test.js
├── .eslintignore      # Files/folders for ESLint to ignore
├── .eslintrc.json     # ESLint configuration
├── .gitignore         # Files/folders for Git to ignore
├── .prettierignore    # Files/folders for Prettier to ignore
├── .prettierrc.json   # Prettier configuration
├── CODE_OF_CONDUCT.md # Community standards
├── CONTRIBUTING.md    # Guidelines for contributors
├── jest.config.mjs
├── LICENSE            # Project license
├── package.json       # Project metadata and dependencies
└── README.md          # This file
```

<!-- END PROJECT STRUCTURE -->

## ✍️ Linting for Documentation

This project uses the [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc) package to enforce that all functions, classes, and methods are properly documented using JSDoc comments. This helps maintain a high level of code quality and makes the codebase easier for new and existing developers to understand.

### How to Check for Missing Documentation

You can check the entire project for missing or incomplete docblocks by running the standard linting command:

```bash
npm run lint
```

ESLint will scan your JavaScript files and report any undocumented code as a warning.

### Example

Consider the following function in your code without any documentation:

```javascript
function calculateArea(width, height) {
  return width * height;
}
```

When you run `npm run lint`, ESLint will produce a warning similar to this:

```plaintext
/path/to/your/project/src/your-file.js
  1:1  warning  Missing JSDoc for function 'calculateArea'  jsdoc/require-jsdoc
```

To fix this, you would add a JSDoc block that describes the function, its parameters, and what it returns. Most modern code editors (like VS Code) can help by generating a skeleton for you if you type `/**` and press Enter above the function.

**Corrected Code:**

```javascript
/**
 * Calculates the area of a rectangle.
 * @param {number} width The width of the rectangle.
 * @param {number} height The height of the rectangle.
 * @returns {number} The calculated area.
 */
function calculateArea(width, height) {
  return width * height;
}
```

After adding the docblock, running `npm run lint` again will no longer show the warning for this function.

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## ⚖️ Code of Conduct

To ensure a welcoming and inclusive community, this project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the standards of behavior we expect from all participants.

## 🙏 Acknowledgements

This project was built upon the shoulders of giants. We'd like to thank the creators and maintainers of these amazing open-source tools:

- [Node.js](https://nodejs.org/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

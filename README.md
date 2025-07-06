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
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [⚖️ Code of Conduct](#-code-of-conduct)
- [🙏 Acknowledgements](#-acknowledgements)
- [📄 License](#-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ✨ Key Features

- **Standard JavaScript**: Uses CommonJS (`require`/`module.exports`), the standard for many Node.js projects.
- **Testing with Jest**: Comes with Jest set up for unit and integration testing.
- **Linting with ESLint**: Includes a strict ESLint configuration to catch errors and enforce coding standards.
- **Formatting with Prettier**: Integrated with Prettier for consistent, automatic code formatting.
- **Markdown Support**: Lints and formats your `.md` files to keep your documentation clean.
- **Sensible Defaults**: Pre-configured with `.gitignore`, `.prettierignore`, and `.eslintignore`.
- **Automated Project Structure**: Includes a script to automatically generate an accurate project structure diagram in the `README.md`.
- **Automated Table of Contents**: Uses `doctoc` to generate and maintain a Table of Contents in the `README.md`.

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

<!-- START AVAILABLE SCRIPTS -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN npm run docs:scripts TO UPDATE -->

| Script | Description |
| --- | --- |
| `npm run check` | A convenience script that runs the linter. |
| `npm run docs:scripts` | Updates the "Available Scripts" section in `README.md` with this script. |
| `npm run docs:structure` | Updates the project structure tree in `README.md`. |
| `npm run fix` | A convenience script that formats code and then fixes lint issues. |
| `npm run format` | Formats all JavaScript, Markdown, and JSON files with Prettier. |
| `npm run lint` | Lints all JavaScript and Markdown files using ESLint. |
| `npm run lint:fix` | Automatically fixes linting issues in all JavaScript and Markdown files. |
| `npm run start` | Runs the application using `node src/index.js`. |
| `npm run test` | Runs all tests with Jest and generates a coverage report. |
| `npm run test:watch` | Runs Jest in watch mode, re-running tests on file changes. |
| `npm run toc` | Generates a Table of Contents in `README.md` using `doctoc`. |

<!-- END AVAILABLE SCRIPTS -->

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

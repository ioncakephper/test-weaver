# JS Starter Template

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![Build Status](https://github.com/ioncakephper/js-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/ioncakephper/js-starter/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ioncakephper/js-starter/branch/main/graph/badge.svg)](https://codecov.io/gh/ioncakephper/js-starter)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A robust starter template for modern Node.js development, pre-configured with Jest for testing, ESLint for linting, and Prettier for code formatting.

This project provides a solid foundation for building high-quality JavaScript applications, ensuring code consistency and best practices from the start.

## ✨ Key Features

- **Modern JavaScript**: Uses ES Modules (`import`/`export`) for a clean and modern codebase.
- **Testing with Jest**: Comes with Jest set up for unit and integration testing.
- **Linting with ESLint**: Includes a strict ESLint configuration to catch errors and enforce coding standards.
- **Formatting with Prettier**: Integrated with Prettier for consistent, automatic code formatting.
- **Markdown Support**: Lints and formats your `.md` files to keep your documentation clean.
- **Sensible Defaults**: Pre-configured with `.gitignore`, `.prettierignore`, and `.eslintignore`.

## 🚀 Getting Started

### Prerequisites

- Node.js version 18.0.0 or higher.

### Installation

1.  Clone the repository or use it as a template on GitHub.
2.  Navigate to the project directory and install the dependencies:

    ```bash
    npm install
    ```

## 📜 Available Scripts

This project includes a set of useful scripts to streamline your development workflow:

- `npm start`
  - Starts the application by running the main entry file (`src/index.js`).

- `npm test`
  - Runs all tests using Jest and generates a coverage report.

- `npm run test:watch`
  - Runs tests in watch mode, re-running them on file changes.

- `npm run lint`
  - Lints all JavaScript and Markdown files for code quality and style issues.

- `npm run format`
  - Formats all JavaScript, Markdown, and JSON files using Prettier.

- `npm run check`
  - Runs the linter to check for issues without making any changes. Ideal for CI environments.

- `npm run fix`
  - Automatically formats all files and fixes all auto-fixable linting issues. Run this before committing your changes.

## 📁 Project Structure

```plaintext
.
├── src/
│   └── index.js      # Main application entry point
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── package.json
└── README.md
```

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

# Test Weaver

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![npm version](https://img.shields.io/npm/v/test-weaver.svg)](https://www.npmjs.com/package/test-weaver) [![Issues](https://img.shields.io/github/issues/ioncakephper/test-weaver.svg)](https://github.com/ioncakephper/test-weaver/issues) [![Discussions](https://img.shields.io/github/discussions/ioncakephper/test-weaver.svg)](https://github.com/ioncakephper/test-weaver/discussions) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md) [![Build Status](https://github.com/ioncakephper/test-weaver/actions/workflows/ci.yml/badge.svg)](https://github.com/ioncakephper/test-weaver/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/ioncakephper/test-weaver/branch/main/graph/badge.svg)](https://codecov.io/gh/ioncakephper/test-weaver) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Changelog](https://img.shields.io/badge/changelog-keep_a_changelog-blue.svg)](CHANGELOG.md)

A command-line utility that skillfully weaves Jest-compatible test files from simple, declarative YAML threads.

This project provides a solid foundation for building high-quality JavaScript applications, ensuring code consistency and best practices from the start.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## 📚 Table of Contents

- [✨ Key Features](#-key-features)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Install via npm (recommended)](#install-via-npm-recommended)
    - [Or use npx (no global install required)](#or-use-npx-no-global-install-required)
    - [Or clone and run locally](#or-clone-and-run-locally)
- [Usage](#usage)
  - [Default Command: `generate`](#default-command-generate)
  - [`init` Command](#init-command)
- [⚙️ Configuration](#-configuration)
  - [`patterns`](#patterns)
  - [`ignore`](#ignore)
  - [Other Settings](#other-settings)
- [API](#api)
  - [Global Options](#global-options)
  - [Commands](#commands)
    - [`generate` (Default Command)](#generate-default-command)
    - [`init`](#init)
- [🚀 Available Scripts](#-available-scripts)
  - [Automated Documentation](#automated-documentation)
  - [Code Quality & Formatting](#code-quality--formatting)
  - [Core Development](#core-development)
  - [The "One-Click" Pre-Commit Workflow](#the-one-click-pre-commit-workflow)
- [A Focus on Quality and Productivity](#a-focus-on-quality-and-productivity)
  - [The Cost of Stale Documentation](#the-cost-of-stale-documentation)
  - [The Power of Workflow Scripts](#the-power-of-workflow-scripts)
- [📦 Release & Versioning](#-release--versioning)
  - [How it Works](#how-it-works)
  - [Creating a New Release](#creating-a-new-release)
    - [Your First Release](#your-first-release)
- [📁 Project Structure](#-project-structure)
- [✍️ Linting for Documentation](#-linting-for-documentation)
  - [How to Check for Missing Documentation](#how-to-check-for-missing-documentation)
  - [Example](#example)
- [🐞 Bug Reports](#-bug-reports)
- [🤝 Contributing](#-contributing)
- [🗺️ Roadmap](#-roadmap)
- [⚖️ Code of Conduct](#-code-of-conduct)
- [🙏 Acknowledgements](#-acknowledgements)
- [👨‍💻 About the Author](#-about-the-author)
- [📄 License](#-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ✨ Key Features

- **Declarative Test Generation**: Define your Jest tests in simple, human-readable YAML files. No more boilerplate.
- **YAML to Jest**: Automatically converts your YAML test definitions into fully functional `*.test.js` files, ready to be run by Jest.
- **Watch Mode**: Automatically re-generate test files whenever your YAML definitions change.
- **Customizable Configuration**: Use a `testweaver.json` file to configure input/output directories and other options. See the [default configuration](config/default.json) for all available settings.
- **Configuration Schema**: Auto-generate a JSON schema for your configuration file to enable validation and autocompletion in your editor.

## 🚀 Getting Started

### Prerequisites

- Node.js version 18.0.0 or higher

### Installation

#### Install via npm (recommended)

```bash
npm install -g test-weaver
```

#### Or use npx (no global install required)

```bash
npx test-weaver input.yaml output.test
```

#### Or clone and run locally

```bash
git clone https://github.com/ioncakephper/test-weaver.git
cd test-weaver
npm install
npm link
```

## Usage

`test-weaver` is a command-line utility that can be invoked using `testweaver` (if installed globally via `npm install -g test-weaver`) or `npx test-weaver` (for one-off use without global installation).

### Default Command: `generate`

When no specific command is provided, `test-weaver` defaults to the `generate` command. This means you can omit `generate` from your command line.

```bash
# Generates test files based on configuration or default patterns
testweaver

# Same as above, explicitly calling the generate command
testweaver generate

# Using the alias for generate
testweaver g

# Generate with specific patterns (long form)
testweaver generate "src/**/*.yaml" "features/**/*.yml"

# Generate with specific patterns (short form)
testweaver g "src/**/*.yaml"

# Generate with a custom config file
testweaver generate --config my-custom-config.json
testweaver g -c my-custom-config.json

# Generate and watch for changes
testweaver generate --watch
testweaver g -w

# Generate with patterns and watch for changes
testweaver generate "src/**/*.yaml" --watch
testweaver g "src/**/*.yaml" -w

# Perform a dry run (simulate generation without writing files)
testweaver generate --dry-run
testweaver g -n

# Specify a different test keyword (e.g., 'test' instead of 'it')
testweaver generate --test-keyword test
testweaver g -k test

# Disable cleanup of generated files when source YAML is unlinked in watch mode
testweaver generate --no-cleanup
```

### `init` Command

Initializes a new project by creating a `.testweaver.json` configuration file.

```bash
# Create a default testweaver.json in the current directory (interactive mode)
testweaver init
testweaver i

# Create a default testweaver.json without interactive prompts
testweaver init --quick
testweaver i -q

# Create a custom config file named 'my-config.json'
testweaver init my-config.json
testweaver i my-config.json

# Force overwrite an existing config file
testweaver init --force
testweaver i -f

# Create a config file with only non-default settings
testweaver init --no-defaults
testweaver i --no-defaults

# Combine options: quick, force, and custom filename
testweaver init my-config.json --quick --force
testweaver i my-config.json -q -f
```

## ⚙️ Configuration

`test-weaver` is designed to work out-of-the-box with zero configuration, but you can customize its behavior by creating a `.testweaver.json` file in your project root. When you run the `init` command, a configuration file is created with the default settings.

The default settings are defined in [`config/default.json`](config/default.json). Let's break down what they mean:

### `patterns`

This is an array of glob patterns that `test-weaver` uses to find your YAML test definition files. By default, it looks for files that:

-   Are in any `__tests__` directory and end with `.yaml` or `.yml`.
    -   *Example Match*: `src/components/__tests__/button.yaml`
-   End with `.test.yaml` or `.test.yml`.
    -   *Example Match*: `src/utils/parser.test.yml`
-   End with `.spec.yaml` or `.spec.yml`.
    -   *Example Match*: `src/api/user.spec.yaml`
-   Are inside a top-level `tests` directory and end with `.yaml` or `.yml`.
    -   *Example Match*: `tests/integration/auth.yml`
-   Are inside a top-level `features` directory and end with `.yaml` or `.yml`.
    -   *Example Match*: `features/login.yaml`

You can override these patterns in your own `.testweaver.json` or by providing them directly on the command line.

### `ignore`

This array tells `test-weaver` which files or directories to exclude, even if they match the `patterns` above. The default ignore patterns are:

-   `node_modules`: To avoid scanning dependency folders.
-   `.git`: To avoid scanning Git-related folders.
-   `temp_files/**/*.{yaml,yml}`: A sample pattern to exclude temporary test files.

### Other Settings

-   `testKeyword`: Specifies the Jest test function to use. Can be `"it"` (default) or `"test"`.
-   `verbose`, `debug`, `silent`: Control the logging level. These are typically set via command-line flags (`--verbose`, `--debug`, `--silent`).
-   `dryRun`: If `true`, simulates test generation without writing any files. Set via `--dry-run`.
-   `noCleanup`: If `true`, prevents the deletion of generated test files when a source YAML is removed in watch mode. Set via `--no-cleanup`.
-   `quick`, `force`, `no-defaults`: These relate to the `init` command for generating configuration files.

## API

### Global Options

`testweaver` supports the following global options, which can be applied before any command:

- `--verbose`: Enable verbose logging for detailed output.
- `--debug`: Enable debug logging for highly detailed debugging (most verbose).
- `--silent`: Suppress all output except critical errors.

### Commands

#### `generate` (Default Command)

Generates Jest-compatible test files from YAML definitions.

**Arguments**

- `[patterns...]`: One or more glob patterns for YAML files to process. If provided, these patterns override any patterns specified in the configuration file.

**Options**

- `-c, --config <path>`: Specify a custom configuration file to load patterns from. This overrides the default configuration cascade.
- `-n, --dry-run`: Perform a dry run: simulate file generation without writing to disk.
- `-i, --ignore <patterns...>`: A list of glob file patterns to exclude from matched files. These patterns override any ignore patterns specified in the configuration file.
- `--no-cleanup`: Do not delete generated `.test.js` files when the source YAML file is unlinked in watch mode.
- `-k, --test-keyword <keyword>`: Specify the keyword for test blocks (`it` or `test`). Defaults to `it`.
- `-w, --watch`: Enable watch mode, which automatically regenerates test files whenever changes are detected in the YAML files.

**Examples**

```bash
# Generate tests from all YAML files in the 'tests' directory
testweaver generate "tests/**/*.yaml"

# Generate tests from a specific YAML file and enable watch mode
testweaver generate my-feature.yaml --watch

# Generate tests using a custom configuration file and ignore specific patterns
testweaver generate -c custom-config.json -i "temp/**/*.yaml"

# Perform a dry run for all YAML files in the 'features' directory
testweaver generate "features/**/*.yml" --dry-run
```

#### `init`

Initializes a new project by creating a `.testweaver.json` configuration file in the current directory.

**Arguments**

- `[filename]`: The name of the configuration file to create. Defaults to `testweaver.json`.

**Options**

- `-f, --force`: Force overwrite the configuration file if it already exists.
- `--no-defaults`: Only include settings in the generated file whose values differ from the default values.
- `-q, --quick`: Skip interactive questions and generate the configuration file with default values.

**Examples**

```bash
# Create a default testweaver.json interactively
testweaver init

# Create a default testweaver.json without prompts
testweaver init --quick

# Create a custom config file named 'my-project-config.json'
testweaver init my-project-config.json

# Force overwrite an existing config file without prompts
testweaver init --quick --force

# Create a config file with only non-default settings
testweaver init --no-defaults
```

## 🚀 Available Scripts

This repository includes a set of scripts designed to streamline development, enforce quality, and automate documentation.

<!-- START AVAILABLE SCRIPTS -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN npm run docs:scripts TO UPDATE -->

### Automated Documentation

- `npm run docs:all`: A convenience script that updates all documentation sections: table of contents, available scripts, and project structure.
- `npm run docs:scripts`: Updates the "Available Scripts" section in `README.md` with this script.
- `npm run docs:structure`: Updates the project structure tree in `README.md`.
- `npm run generate-schema`: Generates a JSON schema for the configuration file.
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

This repository is more than just a collection of files; it's a workflow designed to maximize developer productivity and enforce high-quality standards from day one. The core philosophy is to **automate the tedious and error-prone tasks** so you can focus on what matters: building great software.

### The Cost of Stale Documentation

In many projects, the `README.md` quickly becomes outdated. Manually updating the project structure or list of scripts is an easily forgotten chore.

`test-weaver` solves this problem with its custom documentation scripts:

- `scripts/update-readme-structure.js`: Saves you from manually drawing out file trees. What might take 5-10 minutes of careful, manual work (and is often forgotten) is now an instant, accurate, and repeatable command.
- `scripts/update-readme-scripts.js`: Ensures that your project's capabilities are always documented. It reads directly from `package.json`, so the documentation can't lie. It even reminds you to describe your scripts, promoting good habits.

### The Power of Workflow Scripts

Chaining commands together is a simple but powerful concept. The `fix`, `docs:all`, and `ready` scripts are designed to create a seamless development experience.

- Instead of remembering to run `prettier` then `eslint --fix`, you just run `npm run fix`.
- Instead of running three separate documentation commands, you just run `npm run docs:all`.
- And most importantly, before you commit, you run `npm run ready`. This single command is your pre-flight check. It guarantees that every commit you push is not only functional but also perfectly formatted, linted, and documented. This discipline saves countless hours in code review and prevents messy commit histories.

By embracing this automation, `test-weaver` helps you build better software, faster.

## 📦 Release & Versioning

This project uses [`release-please`](https://github.com/googleapis/release-please) to automate releases, versioning, and changelog generation. This ensures a consistent and hands-off release process, relying on the Conventional Commits specification.

### How it Works

1. **Conventional Commits**: All changes merged into the `main` branch should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification (e.g., `feat: add new feature`, `fix: resolve bug`).
2. **Release Pull Request**: `release-please` runs as a GitHub Action and monitors the `main` branch for new Conventional Commits. When it detects changes that warrant a new release (e.g., a `feat` commit for a minor version, a `fix` commit for a patch version), it automatically creates a "Release PR" with a title like `chore(release): 1.2.3`.
3. **Review and Merge**: This Release PR contains:
   - An updated `CHANGELOG.md` with all changes since the last release.
   - A bumped version number in `package.json`.
   - Proposed release notes. Review this PR, and once satisfied, merge it into `main`.
4. **Automated GitHub Release & Publish**: Merging the Release PR triggers two final, sequential actions:
   - The `release-please` action creates a formal GitHub Release and a corresponding Git tag (e.g., `v1.1.0`).
   - The creation of this release then triggers the `publish.yml` workflow, which automatically publishes the package to the npm registry.

### Creating a New Release

To create subsequent releases, simply merge changes into the `main` branch using Conventional Commits. `release-please` will handle the rest by creating a Release PR. Once that PR is merged, the new version will be released automatically.

#### Your First Release

To bootstrap the process and create your very first release:

1. Ensure your `package.json` version is at a sensible starting point (e.g., `1.0.0`).
2. Make at least one commit to the `main` branch that follows the Conventional Commits specification. A good first commit would be: `feat: Initial release`.
3. Push your commit(s) to `main`. The `release-please` action will run and create your first Release PR.
4. Review and merge this PR. This will trigger the creation of your `v1.0.0` GitHub Release and publish the package to npm.

For more details, refer to the [release-please documentation](https://github.com/googleapis/release-please#how-it-works).

## 📁 Project Structure

<!-- START PROJECT STRUCTURE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN `npm run docs:structure` TO UPDATE -->

```plaintext
.
├── .github/           # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml             # Continuous Integration (CI) workflow
│       ├── publish.yml
│       └── release-please.yml
├── .qodo/
│   └── testConfig.toml
├── config/
│   ├── default-config.schema.json
│   └── default.json
├── src/               # Source code
│   ├── commands/
│   │   ├── generate.js
│   │   └── init.js
│   ├── config/
│   │   └── configLoader.js
│   ├── core/
│   │   ├── fileProcessor.js
│   │   ├── testGenerator.js
│   │   └── watcher.js
│   ├── utils/
│   │   ├── commandLoader.js
│   │   └── logger.js
│   └── index.js  # Main application entry point
├── tests/
│   └── index.test.js
├── .eslintignore      # Files/folders for ESLint to ignore
├── .eslintrc.json     # ESLint configuration
├── .gitignore         # Files/folders for Git to ignore
├── .npmrc
├── .prettierignore    # Files/folders for Prettier to ignore
├── .prettierrc.json   # Prettier configuration
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md # Community standards
├── CONTRIBUTING.md    # Guidelines for contributors
├── jest.config.js
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

## 🐞 Bug Reports

Found a bug? We'd love to hear about it. Please raise an issue on our [GitHub Issues](https://github.com/ioncakephper/test-weaver/issues) page.

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## 🗺️ Roadmap

This project is actively maintained, and we have a clear vision for its future. Here are some of the features and improvements we are planning:

- **TypeScript Support**: Add a separate branch or configuration for a TypeScript version of this template.
- **Monorepo Example**: Provide guidance and an example setup for using this template within a monorepo structure.
- **Containerization**: Include a `Dockerfile` and `docker-compose.yml` for easy container-based development.
- **Additional CI/CD Examples**: Add examples for other CI/CD providers like CircleCI or GitLab CI.

If you have ideas for other features, please open an issue to discuss them!

## ⚖️ Code of Conduct

To ensure a welcoming and inclusive community, this project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the standards of behavior we expect from all participants.

## 🙏 Acknowledgements

This project was built upon the shoulders of giants. We'd like to thank the creators and maintainers of these amazing open-source tools and specifications that make this template possible:

- [Node.js](https://nodejs.org/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Release Please](https://github.com/googleapis/release-please)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Doctoc](https://github.com/thlorenz/doctoc)
- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [Semantic Versioning](https://semver.org/)
- [Contributor Covenant](https://www.contributor-covenant.org/)

## 👨‍💻 About the Author

This template was created and is maintained by **Ion Gireada**.

- **GitHub**: [@ioncakephper](https://github.com/ioncakephper)
- **Website**: Feel free to add your personal website or blog here.
- **LinkedIn**: Connect with me on [LinkedIn](https://www.linkedin.com/in/ion-gireada-223929/)!

## 📄 License

This project is licensed under the [MIT License](LICENSE).

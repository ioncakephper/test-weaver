module.exports =
  /**
   * Generates a configuration object for a file watcher, and shows how to use it.
   * This configuration is used to watch for changes in JavaScript, Markdown, and JSON files
   * and automatically run ESLint and Prettier to fix and format the code.
   * It also ignores certain directories like `node_modules`, `dist`, `coverage`, and `.git`.
   * @returns {object} The configuration object.
   */
  () => {
    return {
      files: ['**/*.{js,md,json}'],
      tasks: ['eslint --fix', 'prettier --write'],
      verbose: true,
      ignore: ['node_modules', 'dist', 'coverage', '.git'],
      watch: {
        paths: {
          glob: '**/*.{js,md,json}',
          options: {
            ignoreInitial: true,
          },
        },
      },
    };
  };

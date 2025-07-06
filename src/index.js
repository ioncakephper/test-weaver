/**
 * Generates a configuration object for a file watcher.
 * @returns {Object} The configuration object.
 */
module.exports = () => {
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

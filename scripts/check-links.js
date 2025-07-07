const { spawnSync } = require('child_process');
const glob = require('glob');

/**
 * This script provides a cross-platform way to find all Markdown files
 * and run markdown-link-check on them. This avoids shell globbing issues
 * on Windows.
 */
function main() {
  try {
    // Use glob.sync to find all Markdown files, ignoring node_modules.
    const files = glob.sync('**/*.md', { ignore: 'node_modules/**' });

    if (files.length === 0) {
      console.log('No Markdown files found to check.');
      process.exit(0);
    }

    console.log(`Checking links in ${files.length} markdown file(s)...`);

    // Use npx to ensure we use the binary from node_modules.
    // spawnSync is used for a simpler synchronous execution model.
    const result = spawnSync(
      'npx',
      ['markdown-link-check', '--quiet', ...files],
      {
        shell: true, // Important for cross-platform compatibility (especially on Windows).
        stdio: 'inherit', // Pipe output directly to the parent process's streams.
      },
    );

    // Exit with the same code as the child process.
    if (result.status !== 0) {
      process.exit(result.status);
    }
  } catch (error) {
    console.error('An error occurred during the link check process:', error);
    process.exit(1);
  }
}

main();

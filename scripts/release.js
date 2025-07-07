const { execSync } = require('child_process');

/**
 * A wrapper script to orchestrate the release process.
 * 1. Runs `standard-version`, passing through any CLI arguments.
 * 2. If not a dry run, runs the interactive script to prompt for publish and push.
 */
function release() {
  // Pass all command-line arguments to standard-version
  const args = process.argv.slice(2).join(' ');
  const isDryRun = args.includes('--dry-run');

  try {
    console.log('Running standard-version...');
    // Run standard-version and show its output
    execSync(`standard-version ${args}`, { stdio: 'inherit' });

    if (isDryRun) {
      console.log('\nDry run complete. No files were changed.');
    } else {
      // After standard-version completes, run the interactive script
      console.log('\nStandard-version complete. Starting interactive prompts...');
      execSync('node scripts/prompt-publish.js', { stdio: 'inherit' });
    }
  } catch (error) {
    console.error('\nAn error occurred during the release process.');
    process.exit(1);
  }
}

release();
const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const path = require('path');
const prompts = require('prompts');

/**
 * Asks the user if they want to publish the new version to npm.
 * Handles pre-release tags correctly.
 */
async function promptAndPublish() {
  try {
    const pkg = JSON.parse(
      readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'),
    );
    const { version: newVersion } = pkg;

    console.log(`\nVersion ${newVersion} has been tagged locally.`);

    const isPrerelease = newVersion.includes('-');
    const defaultPublish = !isPrerelease; // Default to 'yes' for stable, 'no' for pre-release
    const publishTag = isPrerelease ? 'next' : 'latest';

    const { shouldPublish } = await prompts({
      type: 'confirm',
      name: 'shouldPublish',
      message: `Do you want to publish version ${newVersion} to npm with tag "${publishTag}"?`,
      initial: defaultPublish,
    });

    if (shouldPublish) {
      const publishCommand = `npm publish --tag ${publishTag}`;
      console.log(`\nRunning: ${publishCommand}`);
      execSync(publishCommand, { stdio: 'inherit' });
      console.log(`\nSuccessfully published version ${newVersion} to npm.`);
    }

    console.log(
      '\nNext step: Push the commit and tags to the remote repository:',
    );
    console.log('git push --follow-tags origin main');
  } catch (error) {
    console.error('\nAn error occurred during the publish prompt:', error);
    process.exit(1);
  }
}

promptAndPublish();

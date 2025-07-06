const fs = require('fs');
const path = require('path');

/**
 * Generates a Markdown table from the scripts in package.json.
 * @param {object} scripts - The scripts object from package.json.
 * @param {object} scriptDescriptions - The script descriptions object from package.json.
 * @returns {string} A Markdown formatted table.
 */
function generateScriptsTable(scripts, scriptDescriptions = {}) {
  let table = '| Script | Description |\n';
  table += '|--------|-------------|\n';

  const sortedScriptNames = Object.keys(scripts).sort();

  for (const scriptName of sortedScriptNames) {
    const description = scriptDescriptions[scriptName];
    if (!description) {
      console.warn(
        `⚠️  Warning: Script '${scriptName}' is missing a description in package.json.`,
      );
    }
    // Use the found description or fall back to the default text for the table.
    table += `| \`npm run ${scriptName}\` | ${description || 'No description available.'} |\n`;
  }
  return table;
}

function main() {
  try {
    const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
    const readmePath = path.resolve(__dirname, '..', 'README.md');

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const readmeContent = fs.readFileSync(readmePath, 'utf8');

    const scriptsTable = generateScriptsTable(
      packageJson.scripts,
      packageJson.scriptDescriptions,
    );

    const startMarker = '<!-- START AVAILABLE SCRIPTS -->';
    const endMarker = '<!-- END AVAILABLE SCRIPTS -->';

    const startIndex = readmeContent.indexOf(startMarker);
    const endIndex = readmeContent.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
      console.error('Error: Could not find script markers in README.md.');
      console.error(
        `Please add '${startMarker}' and '${endMarker}' to your README.md`,
      );
      process.exit(1);
    }

    const contentBefore = readmeContent.substring(
      0,
      startIndex + startMarker.length,
    );
    const contentAfter = readmeContent.substring(endIndex);

    const doNotEditComment = `\n<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN npm run docs:scripts TO UPDATE -->\n`;

    const newReadmeContent = `${contentBefore}${doNotEditComment}\n${scriptsTable}\n${contentAfter}`;
    fs.writeFileSync(readmePath, newReadmeContent, 'utf8');
    console.log(
      '✅ Successfully updated the Available Scripts section in README.md',
    );
  } catch (error) {
    console.error('❌ An error occurred while updating the README:', error);
    process.exit(1);
  }
}

main();

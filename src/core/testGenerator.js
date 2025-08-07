/**
 * @file src/core/testGenerator.js
 * @description Contains the core logic for generating Jest-compatible test code
 * from a parsed YAML structure.
 * @author Ion Gireada/AI Assistant
 * @license MIT
 */

/**
 * Escapes special characters in a string to be safely used within a JavaScript string literal.
 * @param {string} str - The input string.
 * @returns {string} The escaped string.
 */
function escapeString(str) {
  return str
    .replace(/\\/g, '\\\\') // Escape backslashes
    .replace(/'/g, `\'`) // Escape single quotes
    .replace(/"/g, '\"') // Escape double quotes
    .replace(/\n/g, '\n') // Escape newlines
    .replace(/\t/g, '\t') // Escape tabs
    .replace(/`/g, '\`'); // Escape backticks
}

/**
 * Generates JavaScript test code (Jest format) from a given YAML structure.
 * Recursively traverses the YAML object/array to create `describe` and `it.todo` blocks.
 * @param {object|Array} yamlContent - The parsed YAML content (can be an object or an array).
 * @param {string} testKeyword - The keyword to use for test blocks ('it' or 'test').
 * @param {string} [indentLevel] - The current indentation string (e.g., '  ', '    '). Used for recursion.
 * @returns {string} The generated JavaScript test code.
 */
function generateTestCode(yamlContent, testKeyword, indentLevel = '') {
  let code = '';
  const newIndentLevel = indentLevel + '  ';

  if (Array.isArray(yamlContent)) {
    yamlContent.forEach((item) => {
      if (typeof item === 'string') {
        code += `${indentLevel}${testKeyword}.todo('${escapeString(item)}');\n`;
      } else if (typeof item === 'object' && item !== null) {
        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            const value = item[key];
            if (
              typeof value === 'object' &&
              value !== null &&
              !Array.isArray(value)
            ) {
              code += `${indentLevel}describe('${escapeString(key)}', () => {\n`;
              code += generateTestCode(value, testKeyword, newIndentLevel);
              code += `${indentLevel}});\n\n`;
            } else if (Array.isArray(value)) {
              code += `${indentLevel}describe('${escapeString(key)}', () => {\n`;
              code += generateTestCode(value, testKeyword, newIndentLevel);
              code += `${indentLevel}});\n\n`;
            } else {
              const testDescription = value ? `${escapeString(key)}: ${escapeString(String(value))}` : escapeString(key);
              code += `${indentLevel}${testKeyword}.todo('${testDescription}');\n`;
            }
          }
        }
      }
    });
  } else if (typeof yamlContent === 'object' && yamlContent !== null) {
    for (const key in yamlContent) {
      if (Object.prototype.hasOwnProperty.call(yamlContent, key)) {
        const value = yamlContent[key];

        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          code += `${indentLevel}describe('${escapeString(key)}', () => {\n`;
          code += generateTestCode(value, testKeyword, newIndentLevel);
          code += `${indentLevel}});\n\n`;
        } else if (Array.isArray(value)) {
          code += `${indentLevel}describe('${escapeString(key)}', () => {\n`;
          code += generateTestCode(value, testKeyword, newIndentLevel);
          code += `${indentLevel}});\n\n`;
        } else {
          const testDescription = value ? `${escapeString(key)}: ${escapeString(String(value))}` : escapeString(key);
          code += `${indentLevel}${testKeyword}.todo('${testDescription}');\n`;
        }
      }
    }
  }
  return code;
}

module.exports = {
  generateTestCode,
};

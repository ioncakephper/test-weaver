const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { processFile } = require('../src/core/fileProcessor');
const { log } = require('../src/utils/logger');

jest.mock('fs');
jest.mock('js-yaml');
jest.mock('../src/utils/logger', () => ({
  log: jest.fn(),
  LOG_LEVELS: {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
  },
}));

describe('processFile', () => {
  const cliConfig = {
    testKeyword: 'it',
    isDryRun: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a test file with the correct name when the input has a .test.yaml extension', () => {
    const yamlFilePath = path.join('path', 'to', 'sample.test.yaml');
    const fileContent = 'test: My Test';
    const parsedYaml = { test: 'My Test' };

    fs.readFileSync.mockReturnValue(fileContent);
    yaml.load.mockReturnValue(parsedYaml);

    processFile(yamlFilePath, cliConfig);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join('path', 'to', 'sample.test.js'),
      expect.any(String),
      'utf8',
    );
  });

  it('should generate a test file with the correct name when the input has a .test.yml extension', () => {
    const yamlFilePath = path.join('path', 'to', 'sample.test.yml');
    const fileContent = 'test: My Test';
    const parsedYaml = { test: 'My Test' };

    fs.readFileSync.mockReturnValue(fileContent);
    yaml.load.mockReturnValue(parsedYaml);

    processFile(yamlFilePath, cliConfig);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join('path', 'to', 'sample.test.js'),
      expect.any(String),
      'utf8',
    );
  });

  it('should generate a test file with the correct name when the input has a .yaml extension', () => {
    const yamlFilePath = path.join('path', 'to', 'sample.yaml');
    const fileContent = 'test: My Test';
    const parsedYaml = { test: 'My Test' };

    fs.readFileSync.mockReturnValue(fileContent);
    yaml.load.mockReturnValue(parsedYaml);

    processFile(yamlFilePath, cliConfig);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join('path', 'to', 'sample.test.js'),
      expect.any(String),
      'utf8',
    );
  });

  it('should handle empty or invalid YAML files gracefully', () => {
    const yamlFilePath = path.join('path', 'to', 'empty.yaml');
    const fileContent = '';

    fs.readFileSync.mockReturnValue(fileContent);
    yaml.load.mockReturnValue(null);

    processFile(yamlFilePath, cliConfig);

    expect(log).toHaveBeenCalledWith(
      expect.stringContaining(
        'is empty or does not contain a valid object structure',
      ),
      'warn',
    );
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it('should log file generation in dry run mode without writing the file', () => {
    const yamlFilePath = path.join('path', 'to', 'sample.yaml');
    const fileContent = 'test: My Test';
    const parsedYaml = { test: 'My Test' };
    const dryRunConfig = { ...cliConfig, isDryRun: true };

    fs.readFileSync.mockReturnValue(fileContent);
    yaml.load.mockReturnValue(parsedYaml);

    processFile(yamlFilePath, dryRunConfig);

    expect(log).toHaveBeenCalledWith(
      `Would generate test file: ${path.join('path', 'to', 'sample.test.js')} (Dry Run)`,
      'info',
    );
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });
});

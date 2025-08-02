const { processFile } = require('../src/core/fileProcessor');
const fs = require('fs');
const path = require('path');
const { log, LOG_LEVELS } = require('../src/utils/logger');

jest.mock('fs');
jest.mock('../src/utils/logger', () => ({
  log: jest.fn(),
  LOG_LEVELS: {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
  },
}));

describe('fileProcessor security', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should prevent writing outside the project directory', () => {
    const yamlFilePath = path.resolve(
      process.cwd(),
      'tests/sample/cli.test.yaml',
    );
    const cliConfig = { outputDir: '../', testKeyword: 'it' };
    fs.readFileSync.mockReturnValue('test: My Test');

    processFile(yamlFilePath, cliConfig);

    expect(log).toHaveBeenCalledWith(
      expect.stringContaining(
        'Attempted to write to a location outside the project directory',
      ),
      LOG_LEVELS.ERROR,
    );
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });
});

const { Command } = require('commander');
const generateCommand = require('../src/commands/generate');
const { loadConfig } = require('../src/config/configLoader');
const { processFile } = require('../src/core/fileProcessor');
const { startWatcher } = require('../src/core/watcher');
const glob = require('glob');
const { log, setLogLevel, LOG_LEVELS } = require('../src/utils/logger');

jest.mock('../src/config/configLoader');
jest.mock('../src/core/fileProcessor');
jest.mock('../src/core/watcher');
jest.mock('glob');
jest.mock('../src/utils/logger', () => ({
  ...jest.requireActual('../src/utils/logger'),
  log: jest.fn(),
  setLogLevel: jest.fn(),
}));

describe('generate command', () => {
  let program;
  let exitMock;
  let helpMock;

  beforeEach(() => {
    program = new Command();
    generateCommand(program);
    exitMock = jest.spyOn(process, 'exit').mockImplementation(() => {});
    helpMock = jest.spyOn(program, 'help').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    exitMock.mockRestore();
    helpMock.mockRestore();
  });

  it.skip('should call loadConfig with the correct arguments', () => {
    const cliPatterns = ['**/*.yaml'];
    const options = { config: 'test-config.json' };
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        effectiveIgnorePatterns: [],
      },
    });

    program.parse([
      'node',
      'test',
      'generate',
      ...cliPatterns,
      '--config',
      options.config,
    ]);

    expect(loadConfig).toHaveBeenCalledWith(
      cliPatterns,
      expect.objectContaining({ ...options, cleanup: true, ignore: [], testKeyword: 'it' }),
    );
  });

  it('should call processFile for each found file in single pass mode', () => {
    const cliPatterns = ['**/*.yaml'];
    const files = ['a.yaml', 'b.yaml'];
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        effectiveIgnorePatterns: [],
      },
    });
    glob.sync.mockReturnValue(files);

    program.parse(['node', 'test', 'generate', ...cliPatterns]);

    expect(processFile).toHaveBeenCalledTimes(2);
    expect(processFile).toHaveBeenCalledWith(files[0], expect.any(Object));
    expect(processFile).toHaveBeenCalledWith(files[1], expect.any(Object));
  });

  it('should call startWatcher in watch mode', () => {
    const cliPatterns = ['**/*.yaml'];
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        watchMode: true,
        effectiveIgnorePatterns: [],
      },
    });

    program.parse(['node', 'test', 'generate', ...cliPatterns, '--watch']);

    expect(startWatcher).toHaveBeenCalled();
  });

  it('should show help and exit when no patterns are provided', () => {
    loadConfig.mockReturnValue({
      cliConfig: { effectivePatterns: [], effectiveIgnorePatterns: [] },
    });

    program.parse(['node', 'test', 'generate']);

    expect(helpMock).toHaveBeenCalled();
  });

  it('should log override messages from command line options', () => {
    const cliPatterns = ['**/*.yaml'];
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        effectiveIgnorePatterns: ['ignore.yaml'],
        isDryRun: true,
        testKeyword: 'test',
        noCleanup: true,
      },
      configSource: 'cli',
    });
    glob.sync.mockReturnValue(['a.yaml']);

    program.parse([
      'node',
      'test',
      'generate',
      ...cliPatterns,
      '--ignore',
      'ignore.yaml',
      '--dry-run',
      '--test-keyword',
      'test',
      '--no-cleanup',
    ]);

    expect(log).toHaveBeenCalledWith(
      `override: using patterns from command line arguments.`,
      LOG_LEVELS.INFO,
    );
    expect(log).toHaveBeenCalledWith(
      `override: using ignore patterns from command line arguments.`,
      LOG_LEVELS.INFO,
    );
    expect(log).toHaveBeenCalledWith(
      `override: dry run mode enabled from command line.`,
      LOG_LEVELS.INFO,
    );
    expect(log).toHaveBeenCalledWith(
      `override: using 'test.todo' for test blocks from command line.`,
      LOG_LEVELS.INFO,
    );
    // expect(log).toHaveBeenCalledWith(
    //   `override: cleanup disabled from command line.`,
    //   LOG_LEVELS.INFO,
    // );
  });

  it('should log messages from config file', () => {
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: ['**/*.yaml'],
        effectiveIgnorePatterns: [],
        isDryRun: true,
        testKeyword: 'test',
        noCleanup: true,
      },
      configSource: 'testweaver.json',
    });
    glob.sync.mockReturnValue(['a.yaml']);

    program.parse(['node', 'test', 'generate']);

    expect(log).toHaveBeenCalledWith(
      `dry run mode enabled from configuration.`,
      LOG_LEVELS.INFO,
    );
    // expect(log).toHaveBeenCalledWith(
    //   `using 'test.todo' for test blocks from configuration.`,
    //   LOG_LEVELS.INFO,
    // );
    expect(log).toHaveBeenCalledWith(
      `cleanup disabled from configuration.`,
      LOG_LEVELS.INFO,
    );
  });

  it('should log a warning in watch mode with dry-run enabled', () => {
    const cliPatterns = ['**/*.yaml'];
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        watchMode: true,
        isDryRun: true,
        effectiveIgnorePatterns: [],
      },
    });

    program.parse(['node', 'test', 'generate', ...cliPatterns, '--watch']);

    expect(startWatcher).toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith(
      `warning: --dry-run is enabled. no files will be written even in watch mode.`,
      LOG_LEVELS.WARN,
    );
  });

  it('should log an error when glob.sync fails', () => {
    const cliPatterns = ['**/*.yaml'];
    const error = new Error('Glob error');
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        effectiveIgnorePatterns: [],
      },
    });
    glob.sync.mockImplementation(() => {
      throw error;
    });

    program.parse(['node', 'test', 'generate', ...cliPatterns]);

    expect(log).toHaveBeenCalledWith(
      `❌ error finding files for pattern '**/*.yaml': ${error.message}`,
      LOG_LEVELS.ERROR,
    );
  });

  it('should log a warning when no files match a pattern', () => {
    const cliPatterns = ['**/*.yaml'];
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        effectiveIgnorePatterns: [],
      },
    });
    glob.sync.mockReturnValue([]);

    program.parse(['node', 'test', 'generate', ...cliPatterns]);

    expect(log).toHaveBeenCalledWith(
      `⚠️ no yaml files found for pattern: '**/*.yaml'`,
      LOG_LEVELS.WARN,
    );
  });

  it('should log a summary message after processing files', () => {
    const cliPatterns = ['**/*.yaml'];
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        effectiveIgnorePatterns: [],
      },
    });
    glob.sync.mockReturnValue(['a.yaml']);

    program.parse(['node', 'test', 'generate', ...cliPatterns]);

    expect(log).toHaveBeenCalledWith(
      `\n✨ cli execution complete. processed 1 of 1 yaml files.`,
      LOG_LEVELS.INFO,
    );
  });

  it('should log a different summary message when no files are found', () => {
    const cliPatterns = ['**/*.yaml'];
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        effectiveIgnorePatterns: [],
      },
    });
    glob.sync.mockReturnValue([]);

    program.parse(['node', 'test', 'generate', ...cliPatterns]);

    expect(log).toHaveBeenCalledWith(
      `\n🤷 no yaml files were found or processed based on the provided patterns.`,
      LOG_LEVELS.INFO,
    );
  });

  it('should work with the alias "g"', () => {
    const cliPatterns = ['**/*.yaml'];
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        effectiveIgnorePatterns: [],
      },
    });
    glob.sync.mockReturnValue(['a.yaml']);

    program.parse(['node', 'test', 'g', ...cliPatterns]);

    expect(loadConfig).toHaveBeenCalled();
    expect(processFile).toHaveBeenCalled();
  });

  it('should call setLogLevel with the configured log level', () => {
    const cliPatterns = ['**/*.yaml'];
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        effectiveIgnorePatterns: [],
        logLevel: 'debug',
      },
    });
    glob.sync.mockReturnValue(['a.yaml']);

    program.parse(['node', 'test', 'generate', ...cliPatterns]);

    expect(setLogLevel).toHaveBeenCalledWith('debug');
  });
});

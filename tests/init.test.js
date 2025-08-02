const { Command } = require('commander');
const initCommand = require('../src/commands/init');
const fs = require('fs');
const inquirer = require('inquirer');

jest.mock('fs');
jest.mock('inquirer');

describe('init command', () => {
  let program;
  let exitMock;

  beforeEach(() => {
    program = new Command();
    initCommand(program);
    exitMock = jest.spyOn(process, 'exit').mockImplementation(() => {});
    fs.readFileSync.mockReturnValue(
      JSON.stringify({
        patterns: ['**/__tests__/**/*.{yaml,yml}'],
        ignore: ['node_modules'],
        testKeyword: 'it',
        outputDir: '.',
        dryRun: false,
        noCleanup: false,
        verbose: false,
        debug: false,
        silent: false,
        'no-defaults': false,
      }),
    );
    inquirer.prompt.mockResolvedValue({
      patterns: ['**/__tests__/**/*.{yaml,yml}'],
      customPatterns: [],
      ignore: ['node_modules'],
      customIgnore: [],
      testKeyword: 'it',
      outputDir: '.',
      dryRun: false,
      noCleanup: false,
      verbose: false,
      debug: false,
      silent: false,
      noDefaults: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    exitMock.mockRestore();
  });

  it('should create a default config file when run with --quick', async () => {
    fs.existsSync.mockReturnValue(false);

    await program.parseAsync(['node', 'test', 'init', '--quick']);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('testweaver.json'),
      expect.any(String),
      'utf8',
    );
  });

  it.skip('should not overwrite an existing file without --force', async () => {
    fs.existsSync.mockReturnValue(true);

    await program.parseAsync(['node', 'test', 'init']);

    expect(fs.writeFileSync).not.toHaveBeenCalled();
    expect(exitMock).toHaveBeenCalledWith(0);
  });

  it('should overwrite an existing file with --force', async () => {
    fs.existsSync.mockReturnValue(true);

    await program.parseAsync(['node', 'test', 'init', '--quick', '--force']);

    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('should run in interactive mode without --quick', async () => {
    fs.existsSync.mockReturnValue(false);

    await program.parseAsync(['node', 'test', 'init']);

    expect(inquirer.prompt).toHaveBeenCalled();
  });
});

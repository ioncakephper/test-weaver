const { Command } = require('commander');
const generateCommand = require('../src/commands/generate');
const { loadConfig } = require('../src/config/configLoader');
const { processFile } = require('../src/core/fileProcessor');
const { startWatcher } = require('../src/core/watcher');
const glob = require('glob');

jest.mock('../src/config/configLoader');
jest.mock('../src/core/fileProcessor');
jest.mock('../src/core/watcher');
jest.mock('glob');

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

  it('should call loadConfig with the correct arguments', () => {
    const cliPatterns = ['**/*.yaml'];
    const options = { config: 'test-config.json' };
    loadConfig.mockReturnValue({ cliConfig: { effectivePatterns: cliPatterns, effectiveIgnorePatterns: [] } });

    program.parse(['node', 'test', 'generate', ...cliPatterns, '--config', options.config]);

    expect(loadConfig).toHaveBeenCalledWith(cliPatterns, expect.objectContaining(options), expect.any(String));
  });

  it('should call processFile for each found file in single pass mode', () => {
    const cliPatterns = ['**/*.yaml'];
    const files = ['a.yaml', 'b.yaml'];
    loadConfig.mockReturnValue({ cliConfig: { effectivePatterns: cliPatterns, effectiveIgnorePatterns: [] } });
    glob.sync.mockReturnValue(files);

    program.parse(['node', 'test', 'generate', ...cliPatterns]);

    expect(processFile).toHaveBeenCalledTimes(2);
    expect(processFile).toHaveBeenCalledWith(files[0], expect.any(Object));
    expect(processFile).toHaveBeenCalledWith(files[1], expect.any(Object));
  });

  it('should call startWatcher in watch mode', () => {
    const cliPatterns = ['**/*.yaml'];
    loadConfig.mockReturnValue({ cliConfig: { effectivePatterns: cliPatterns, watchMode: true, effectiveIgnorePatterns: [] } });

    program.parse(['node', 'test', 'generate', ...cliPatterns, '--watch']);

    expect(startWatcher).toHaveBeenCalled();
  });

  it('should show help and exit when no patterns are provided', () => {
    loadConfig.mockReturnValue({ cliConfig: { effectivePatterns: [], effectiveIgnorePatterns: [] } });

    program.parse(['node', 'test', 'generate']);

    expect(helpMock).toHaveBeenCalled();
  });
});

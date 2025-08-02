const { Command } = require('commander');
const generateCommand = require('../src/commands/generate');
const { loadConfig } = require('../src/config/configLoader');
const { processFile } = require('../src/core/fileProcessor');
const glob = require('glob');
const path = require('path');

jest.mock('../src/config/configLoader');
jest.mock('../src/core/fileProcessor');
jest.mock('glob');

describe('generate command with --output-dir', () => {
  let program;

  beforeEach(() => {
    program = new Command();
    generateCommand(program);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it('should generate files in the same directory when --output-dir is not provided', () => {
  //   const cliPatterns = ['tests/sample/**/*.yaml'];
  //   const files = [path.resolve(process.cwd(), 'tests/sample/cli.test.yaml')];
  //   loadConfig.mockReturnValue({ cliConfig: { effectivePatterns: cliPatterns, effectiveIgnorePatterns: [] } });
  //   glob.sync.mockReturnValue(files);

  //   program.parse(['node', 'test', 'generate', ...cliPatterns]);

  //   expect(processFile).toHaveBeenCalledWith(files[0], expect.objectContaining({ outputDir: undefined }));
  // });

  it('should generate files in the specified output directory, preserving the structure', () => {
    const cliPatterns = ['tests/sample/**/*.yaml'];
    const files = [path.resolve(process.cwd(), 'tests/sample/cli.test.yaml')];
    const outputDir = 'out';
    loadConfig.mockReturnValue({
      cliConfig: {
        effectivePatterns: cliPatterns,
        effectiveIgnorePatterns: [],
        outputDir,
      },
    });
    glob.sync.mockReturnValue(files);

    program.parse([
      'node',
      'test',
      'generate',
      ...cliPatterns,
      '--output-dir',
      outputDir,
    ]);

    expect(processFile).toHaveBeenCalledWith(
      files[0],
      expect.objectContaining({ outputDir }),
    );
  });
});

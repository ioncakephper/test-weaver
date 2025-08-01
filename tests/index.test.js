const main = require('../src/index');
const { Command } = require('commander');

jest.mock('commander', () => {
  const original = jest.requireActual('commander');
  const mockCommand = {
    name: jest.fn().mockReturnThis(),
    description: jest.fn().mockReturnThis(),
    version: jest.fn().mockReturnThis(),
    option: jest.fn().mockReturnThis(),
    alias: jest.fn().mockReturnThis(),
    command: jest.fn().mockReturnThis(),
    argument: jest.fn().mockReturnThis(),
    action: jest.fn().mockReturnThis(),
    configureHelp: jest.fn().mockReturnThis(),
    parse: jest.fn().mockReturnThis(),
  };
  return {
    Command: jest.fn(() => mockCommand),
  };
});

describe('main function from src/index.js', () => {
  it('should run without throwing an error', () => {
    expect(() => main()).not.toThrow();
  });
});
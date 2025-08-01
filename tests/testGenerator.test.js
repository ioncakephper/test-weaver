const { generateTestCode } = require('../src/core/testGenerator');

describe('generateTestCode', () => {
  // Test case 1: Basic YAML with a single describe block and it.todo tests
  test('should generate correct code for a simple YAML structure', () => {
    const yamlContent = {
      'My Feature': [
        'should do something',
        'should do something else'
      ]
    };
    const expectedCode = `describe('My Feature', () => {
  it.todo('should do something');
  it.todo('should do something else');
});

`;
    expect(generateTestCode(yamlContent, 'it')).toBe(expectedCode);
  });

  // Test case 2: Nested describe blocks
  test('should generate correct code for nested describe blocks', () => {
    const yamlContent = {
      'Parent Suite': {
        'Child Suite 1': [
          'test 1.1',
          'test 1.2'
        ],
        'Child Suite 2': {
          'Grandchild Suite': [
            'test 2.1.1'
          ]
        }
      }
    };
    const expectedCode = `describe('Parent Suite', () => {
  describe('Child Suite 1', () => {
    it.todo('test 1.1');
    it.todo('test 1.2');
  });

  describe('Child Suite 2', () => {
    describe('Grandchild Suite', () => {
      it.todo('test 2.1.1');
    });

  });

});

`;
    expect(generateTestCode(yamlContent, 'it')).toBe(expectedCode);
  });

  // Test case 3: Using 'test' as the testKeyword
  test('should use the specified testKeyword', () => {
    const yamlContent = {
      'Another Feature': [
        'should work with test keyword'
      ]
    };
    const expectedCode = `describe('Another Feature', () => {
  test.todo('should work with test keyword');
});

`;
    expect(generateTestCode(yamlContent, 'test')).toBe(expectedCode);
  });

  // Test case 4: Empty YAML content (object)
  test('should return empty string for empty object', () => {
    const yamlContent = {};
    expect(generateTestCode(yamlContent, 'it')).toBe('');
  });

  // Test case 5: Empty YAML content (array)
  test('should return empty string for empty array', () => {
    const yamlContent = [];
    expect(generateTestCode(yamlContent, 'it')).toBe('');
  });

  // Test case 6: YAML with mixed string and object at the same level
  test('should handle mixed string and object at the same level', () => {
    const yamlContent = [
      'top level test',
      {
        'Mixed Suite': [
          'nested mixed test'
        ]
      }
    ];
    const expectedCode = `it.todo('top level test');
describe('Mixed Suite', () => {
  it.todo('nested mixed test');
});

`;
    expect(generateTestCode(yamlContent, 'it')).toBe(expectedCode);
  });

  // Test case 7: YAML with describe block having direct tests and nested describe
  test('should handle describe with direct tests and nested describe', () => {
    const yamlContent = {
      'Main Functionality': [
        'should initialize',
        {
          'Sub-Functionality': [
            'should handle sub-case'
          ]
        }
      ]
    };
    const expectedCode = `describe('Main Functionality', () => {
  it.todo('should initialize');
  describe('Sub-Functionality', () => {
    it.todo('should handle sub-case');
  });

});

`;
    expect(generateTestCode(yamlContent, 'it')).toBe(expectedCode);
  });

  // Test case 8: YAML with a key having a non-object/non-array value (should be it.todo)
  test('should handle non-object/non-array values as it.todo', () => {
    const yamlContent = {
      'Simple Test': 'This is a simple test description'
    };
    const expectedCode = `it.todo('Simple Test: This is a simple test description');\n`;
    expect(generateTestCode(yamlContent, 'it')).toBe(expectedCode);
  });

  // Test case 9: YAML with a key having a null value
  test('should handle null values as it.todo with key as description', () => {
    const yamlContent = {
      'Null Test': null
    };
    const expectedCode = `it.todo('Null Test');\n`;
    expect(generateTestCode(yamlContent, 'it')).toBe(expectedCode);
  });

  // Test case 10: YAML with a key having a number value
  test('should handle number values as it.todo with key and value as description', () => {
    const yamlContent = {
      'Number Test': 123
    };
    const expectedCode = `it.todo('Number Test: 123');\n`;
    expect(generateTestCode(yamlContent, 'it')).toBe(expectedCode);
  });

  // Test case 11: YAML with a key having a boolean value
  test('should handle boolean values as it.todo with key and value as description', () => {
    const yamlContent = {
      'Boolean Test': true
    };
    const expectedCode = `it.todo('Boolean Test: true');\n`;
    expect(generateTestCode(yamlContent, 'it')).toBe(expectedCode);
  });
});

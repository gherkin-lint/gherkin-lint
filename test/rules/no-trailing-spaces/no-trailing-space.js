var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-trailing-spaces.js');
var runTest = ruleTestBase.createRuleTest(rule, 'Trailing spaces are not allowed');
var assert = require('chai').assert;

function createFeatureWithDocStringAt(line) {
  return {
    children: [{
      scenario: {
        steps: [{
          docString: {
            location: {line: line}
          }
        }]
      }
    }]
  };
}

describe('No Trailing Spaces Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    return runTest('no-trailing-spaces/NoViolations.feature', {}, []);
  });

  it('raises an error for trailing spaces', function() {
    return runTest('no-trailing-spaces/TrailingSpaces.feature', {}, [
      {
        messageElements: {},
        line: 1
      },
      {
        messageElements: {},
        line: 3
      },
      {
        messageElements: {},
        line: 4
      }
    ]);
  });

  it('raises an error for trailing tabs', function() {
    return runTest('no-trailing-spaces/TrailingTabs.feature', {}, [
      {
        messageElements: {},
        line: 4
      }
    ]);
  });

  it('allows indentation-only blank lines inside DocStrings', function() {
    var errors = rule.run(createFeatureWithDocStringAt(4), {
      lines: [
        'Feature: DocString formatting',
        'Scenario: attached text',
        '  Given a message with:',
        '    """',
        '    preserved content',
        '    ',
        '    """',
        '  Then trailing spaces are still rejected '
      ]
    });

    assert.deepEqual(errors, [{
      message: 'Trailing spaces are not allowed',
      rule: 'no-trailing-spaces',
      line: 8
    }]);
  });

  it('allows indentation-only blank lines inside backtick DocStrings', function() {
    var errors = rule.run(createFeatureWithDocStringAt(4), {
      lines: [
        'Feature: DocString formatting',
        'Scenario: attached text',
        '  Given a message with:',
        '    ```text/plain',
        '    \t',
        '    ```'
      ]
    });

    assert.deepEqual(errors, []);
  });

  it('rejects trailing whitespace on nonblank DocString content', function() {
    var errors = rule.run(createFeatureWithDocStringAt(4), {
      lines: [
        'Feature: DocString formatting',
        'Scenario: attached text',
        '  Given a message with:',
        '    """',
        '    trailing space ',
        '    """'
      ]
    });

    assert.deepEqual(errors, [{
      message: 'Trailing spaces are not allowed',
      rule: 'no-trailing-spaces',
      line: 5
    }]);
  });

  it('recognizes DocString closing delimiters with suffixes', function() {
    var errors = rule.run(createFeatureWithDocStringAt(4), {
      lines: [
        'Feature: DocString formatting',
        'Scenario: attached text',
        '  Given a message with:',
        '    """',
        '    ',
        '    """ # end attachment',
        '  Then trailing spaces are still rejected '
      ]
    });

    assert.deepEqual(errors, [{
      message: 'Trailing spaces are not allowed',
      rule: 'no-trailing-spaces',
      line: 7
    }]);
  });
});

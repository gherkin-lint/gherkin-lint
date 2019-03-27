const ruleTestBase = require('../rule-test-base');
const rule = require('../../../src/rules/new-line-at-eof.js');
const runYesTest = ruleTestBase.createRuleTest(rule, () =>
  'New line at EOF(end of file) is required');
const runNoTest = ruleTestBase.createRuleTest(rule, () =>
  'New line at EOF(end of file) is not allowed');

describe('New Line At EOF Rule', function() {
  it('detects an error when property is not "yes" or "no"', function() {
    runYesTest('new-line-at-eof/NewLineAtEOF.feature', 'maybe', [
      'Invalid rule configuration for "new-line-at-eof" -  The rule does not have the specified configuration option "maybe"',
    ]);
  });

  context('"yes" configuration', () => {
    it('doesn\'t raise errors when there are new line at eof', function() {
      runYesTest('new-line-at-eof/NewLineAtEOF.feature', 'yes', []);
    });

    it('raises error when there are no new line at eof', function() {
      runYesTest('new-line-at-eof/NoNewLineAtEOF.feature', 'yes', [{
        messageElements: {},
        line: 7,
      }]);
    });
  });

  context('"no" configuration', () => {
    it('raises error when there are new line at eof', function() {
      runNoTest('new-line-at-eof/NewLineAtEOF.feature', 'no', [{
        messageElements: {},
        line: 8,
      }]);
    });

    it('doesn\'t raise error when there are no new line at eof', function() {
      runNoTest('new-line-at-eof/NoNewLineAtEOF.feature', 'no', []);
    });
  });
});

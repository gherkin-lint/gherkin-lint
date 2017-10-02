var runTest = require('../rule-test-base')(
  require('../../../src/rules/no-superfluous-tags.js'),
  'Tag(s) duplicated on a Feature and a Scenario in that Feature: <%= tags %>');

describe('No Superfluous Tags Rule', function() {
  it('doesn\'t raise errors when there are no violations', function() {
    runTest('no-superfluous-tags/NoViolations.feature', {}, []);
  });

  it('detects errors for scenarios, and scenario outlines', function() {
    runTest('no-superfluous-tags/Violations.feature', {}, [{
      line: 7,
      messageElements: {tags: '@superfluoustag1'}
    }, {
      line: 11,
      messageElements: {tags: '@superfluoustag1, @superfluoustag2'}
    }]);
  });
});

var ruleTestBase = require('../rule-test-base');
var rule = require('../../../dist/rules/no-dupe-file-names.js');
var runTest = ruleTestBase.createRuleTest(rule,
  'File name is already used in: <%= location %>');

describe('No Duplicate File Names Rule', function() {
  it('doesn\'t raise errors when there are no duplicate file names', function() {
    return runTest('no-dupe-file-names/firstFolder/MyFeature1.feature', {}, []);
  });

  it('raises errors for every duplicate file name', function() {
    return runTest('no-dupe-file-names/firstFolder/MyFeature.feature', {}, [])
      .then(() => {
        return runTest('no-dupe-file-names/secondFolder/MyFeature.feature', {}, [
          {
            line: 0,
            messageElements: {
              location: 'test/rules/no-dupe-file-names/firstFolder/MyFeature.feature'
            }
          }
        ]);
      })
      .then(() => {
        return runTest('no-dupe-file-names/thirdFolder/MyFeature.feature', {}, [
          {
            line: 0,
            messageElements: {
              location: 'test/rules/no-dupe-file-names/firstFolder/MyFeature.feature, test/rules/no-dupe-file-names/secondFolder/MyFeature.feature'
            }
          }
        ]);
      });
  });
});

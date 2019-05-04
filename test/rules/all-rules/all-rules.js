var rules = require('../../../dist/rules.js');
var linter = require('../../../dist/linter.js');

// Test cases for incomplete feature files that have broken over time accross multiple rules
describe('All rules', function() {

  function runAllEnabledRulesAgainstFile(featureFile) {
    var allRules = rules.getAllRules();
    var configuration = {};
    Object.keys(allRules).forEach(function(rule) {
      if (rule == 'new-line-at-eof') {
        configuration[rule] = ['on', 'yes']; 
      } else if (rule == 'required-tags') {
        configuration[rule] = ['on', {'tags': [] }];
      } else {
        configuration[rule] = 'on'; 
      }
    });

    const {feature, file} = linter.readAndParseFile('test/rules/all-rules/' + featureFile, 'utf8');

    rules.runAllEnabledRules(feature, file, configuration);
  }

  it('do not throw exceptions when processing an empty feature', function() {
    runAllEnabledRulesAgainstFile('EmptyFeature.feature');
  });

  it('do not throw exceptions when processing a feature with no children', function() {
    runAllEnabledRulesAgainstFile('ChildlessFeature.feature');
  });

  it('do not throw exceptions when processing a feature with no steps', function() {
    runAllEnabledRulesAgainstFile('SteplessFeature.feature');
  });

  it('do not throw exceptions when processing a scenario outline with an empty examples table', function() {
    runAllEnabledRulesAgainstFile('EmptyExamples.feature');
  });
});
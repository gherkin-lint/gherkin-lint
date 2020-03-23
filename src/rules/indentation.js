var _ = require('lodash');
var languageMapping = require('gherkin').default.dialects;
var rule = 'indentation';

var defaultConfig = {
  'Feature': 0,
  'Background': 0,
  'Scenario': 0,
  'Step': 2,
  'Examples': 0,
  'example': 2,
  'given': 2,
  'when': 2,
  'then': 2,
  'and': 2,
  'but': 2
};

var availableConfigs = _.merge({}, defaultConfig, {
  // The values here are unused by the config parsing logic.
  'feature tag': -1,
  'scenario tag': -1
});

function mergeConfiguration(configuration) {
  var mergedConfiguration = _.merge({}, defaultConfig, configuration);
  if (!Object.prototype.hasOwnProperty.call(mergedConfiguration, 'feature tag')) {
    mergedConfiguration['feature tag'] = mergedConfiguration['Feature'];
  }
  if (!Object.prototype.hasOwnProperty.call(mergedConfiguration, 'scenario tag')) {
    mergedConfiguration['scenario tag'] = mergedConfiguration['Scenario'];
  }
  return mergedConfiguration;
}

function run(feature, unused, configuration) {
  if (!feature) {
    return [];
  }

  var errors = [];
  var mergedConfiguration = mergeConfiguration(configuration);
  function test(parsedLocation, type) {
    // location.column is 1 index based so, when we compare with the expected
    // indentation we need to subtract 1
    if (parsedLocation.column - 1 !== mergedConfiguration[type]) {
      errors.push({
        message: 'Wrong indentation for "' + type +
                            '", expected indentation level of ' + mergedConfiguration[type] +
                            ', but got ' + (parsedLocation.column - 1),
        rule   : rule,
        line   : parsedLocation.line
      });
    }
  }

  function testStep(step) {
    var keyword = step.keyword;
    var stepType = _.findKey(languageMapping[feature.language], function(values) {
      return values instanceof Array && values.indexOf(keyword) !== -1;
    });
    stepType = stepType in configuration ? stepType : 'Step';
    test(step.location, stepType);
  }

  function testTags(tags, type) {
    _(tags).groupBy('location.line').forEach(function(tagLocationGroup) {
      var firstTag = _(tagLocationGroup).sortBy('location.column').head();
      test(firstTag.location, type);
    });
  }

  test(feature.location, 'Feature');
  testTags(feature.tags, 'feature tag');

  feature.children.forEach(function(child) {
    if (child.background) {
      test(child.background.location, 'Background');
      child.background.steps.forEach(testStep);
    } else {
      test(child.scenario.location, 'Scenario');
      testTags(child.scenario.tags, 'scenario tag');
      child.scenario.steps.forEach(testStep);

      child.scenario.examples.forEach(function(examples) {
        test(examples.location, 'Examples');

        if (examples.tableHeader) {
          test(examples.tableHeader.location, 'example');
          examples.tableBody.forEach(function(row) {
            test(row.location, 'example');
          });
        }
      });
    }
  });

  return errors;
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};

var _ = require('lodash');
var languageMapping = require('gherkin').DIALECTS;
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

function testFeature(feature, configuration, mergedConfiguration) {
  var errors = [];

  function test(parsedLocation, type) {
    // location.column is 1 index based so, when we compare with the expected
    // indentation we need to subtract 1
    if (parsedLocation.column - 1 !== mergedConfiguration[type]) {
      errors.push({message: 'Wrong indentation for "' + type +
                            '", expected indentation level of ' + mergedConfiguration[type] +
                            ', but got ' + (parsedLocation.column - 1),
      rule   : rule,
      line   : parsedLocation.line});
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

  function testScenarioOutline(scenarioOutline) {
    test(scenarioOutline.location, 'Scenario');
    scenarioOutline.examples.forEach(function(examples) {
      test(examples.location, 'Examples');
      test(examples.tableHeader.location, 'example');
      examples.tableBody.forEach(function(row) {
        test(row.location, 'example');
      });
    });
  }

  function testTags(tags, type) {
    _(tags).map(function(tag) {
      return tag.location;
    }).groupBy(function(tagLocation) {
      return tagLocation.line;
    }).forEach(function(locationsPerLine) {
      const firstLocation = locationsPerLine.sort((a, b) => a.column - b.column)[0];
      test(firstLocation, type);
    });
  }

  test(feature.location, 'Feature');
  testTags(feature.tags, 'feature tag');

  feature.children.forEach(function(child) {
    switch(child.type) {
    case 'Background':
      test(child.location, 'Background');
      break;
    case 'Scenario':
      test(child.location, 'Scenario');
      testTags(child.tags, 'scenario tag');
      break;
    case 'ScenarioOutline':
      testScenarioOutline(child);
      testTags(child.tags, 'scenario tag');
      break;
    default:
      errors.push({message: 'Unknown gherkin node type ' + child.type,
        rule   : rule,
        line   : child.location.line});
      break;
    }

    child.steps.forEach(testStep);
  });

  return errors;
}

function run(feature, unused, configuration) {
  if (!feature || Object.keys(feature).length === 0) {
    return;
  }
  var mergedConfiguration = mergeConfiguration(configuration);

  return testFeature(feature, configuration, mergedConfiguration);
}

module.exports = {
  name: rule,
  run: run,
  availableConfigs: availableConfigs
};

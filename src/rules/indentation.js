/**
* @module rules/indentation
**/


// --- Dependencies ---
const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');
// --- Dependencies end ---


/** The name of the rule
* @member {string} name
**/
const name = 'indentation';


const defaultConfig = {
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

/** 
* The indentation rule can be configured for each gherkin kewyword and uses following values by default:
* <br>- Expected indentation for Feature, Background, Scenario, Examples heading: 0 spaces
* <br>- Expected indentation for Steps and each example: 2 spaces
* <br>The user provided configuration will be merged with the defaults. That means that you only need to specify only the 
* keywords for which you want to override the default indentantion config.
* <br>Additionally:  
* <br>- `Step` will be used as a fallback if the keyword of the step, eg. 'given', is not specified.  
* <br>- If `feature tag` is not set then `Feature` is used as a fallback
* <br>- If `scenario tag` is not set then `Scenario` is used as a fallback.
*
* <br>This rule works in all locales.
*
* @example <caption>The rule configuration should look like this (only specify the keywords for which you want to override the defaults)</caption> 
* {
*   "indentation" : [
*     "on", {
*       "Feature": 0,
*       "Background": 0,
*       "Scenario": 0,
*       "Step": 2,
*       "Examples": 0,
*       "example": 2,
*       "given": 2,
*       "when": 2,
*       "then": 2,
*       "and": 2,
*       "but": 2,
*       "feature tag": 0,
*       "scenario tag": 0
*     }
*   ]
* }
* @member {Object} availableConfigs
**/
const availableConfigs = _.merge({}, defaultConfig, {
  // The values here are unused by the config parsing logic.
  'feature tag': -1,
  'scenario tag': -1
});


/**
* @function    run
* @description Runs the rule's logic against the provide feature file/object
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @param unused        {}               - Unused parameter, exists to conform to the rule run method signature
* @param configuration {Object}         - The rule configuration whose format should match `availableConfigs`
* @returns             {Array}          - The detected errors
**/
function run(feature, unused, configuration) {
  if (!feature) {
    return [];
  }

  let errors = [];
  const mergedConfiguration = mergeConfiguration(configuration);

  function test(parsedLocation, type) {
    // location.column is 1 index based so, when we compare with the expected
    // indentation we need to subtract 1
    if (parsedLocation.column - 1 !== mergedConfiguration[type]) {
      errors.push({
        message: `Wrong indentation for "${type}", expected indentation level of `+ 
                 `${mergedConfiguration[type]}, but got ${(parsedLocation.column - 1)}`,
        rule   : name,
        line   : parsedLocation.line
      });
    }
  }

  function testStep(step) {
    let stepType = gherkinUtils.getLanguageInsitiveKeyword(step, feature.language);
    stepType = stepType in configuration ? stepType : 'Step';
    test(step.location, stepType);
  }

  function testTags(tags, type) {
    _(tags).groupBy('location.line').forEach(tagLocationGroup => {
      const firstTag = _(tagLocationGroup).sortBy('location.column').head();
      test(firstTag.location, type);
    });
  }

  test(feature.location, 'Feature');
  testTags(feature.tags, 'feature tag');

  feature.children.forEach(child => {
    if (child.background) {
      test(child.background.location, 'Background');
      child.background.steps.forEach(testStep);
    } else {
      test(child.scenario.location, 'Scenario');
      testTags(child.scenario.tags, 'scenario tag');
      child.scenario.steps.forEach(testStep);

      child.scenario.examples.forEach(examples => {
        test(examples.location, 'Examples');

        if (examples.tableHeader) {
          test(examples.tableHeader.location, 'example');
          examples.tableBody.forEach(row => {
            test(row.location, 'example');
          });
        }
      });
    }
  });

  return errors;
}


/**
* @function    mergeConfiguration
* @description If the user hasn't provided a configuration value for feature tags and scenario tags, it sets the 
*              indentation for those to the corresponding feature and scenario settings
* @private
* @param configuration  {Object} - The used defined rule configuration
* @returns              {Object} - The merged configuration  
**/
function mergeConfiguration(configuration) {
  let mergedConfiguration = _.merge({}, defaultConfig, configuration);
  if (!Object.prototype.hasOwnProperty.call(mergedConfiguration, 'feature tag')) {
    mergedConfiguration['feature tag'] = mergedConfiguration['Feature'];
  }
  if (!Object.prototype.hasOwnProperty.call(mergedConfiguration, 'scenario tag')) {
    mergedConfiguration['scenario tag'] = mergedConfiguration['Scenario'];
  }
  return mergedConfiguration;
}


module.exports = {
  name,
  run,
  availableConfigs,
};

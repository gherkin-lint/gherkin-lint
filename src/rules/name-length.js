
/**
* @module rules/name-length
**/
const _ = require('lodash');


/** The name of the rule
* @member {string} name
**/
const name = 'name-length';


/** The name-lentgth rule allows you to configure the maximum length for:
<br> - Feature name
<br> - Scenario name
<br> - Step text
By default the maximum length is set to 70 characters. 
@example <caption>The rule configuration should look like this (only specify the keywords for which you want to override the defaults)</caption> 
{
  "name-length" : ["on", { "Feature": 70, "Scenario": 70, "Step": 70 }]
}
* @member {Object} availableConfigs
**/
const availableConfigs = {
  'Feature': 70,
  'Step': 70,
  'Scenario': 70
};


let errors = [];


/**
@function test
@private
@param stringToTest   {String}           - The string that will get tested
@param location       {Gherkin.Location} - A Gherkin location object, used for error reporting
@param configuration  {Map}              - The rule configuration
@param type           {String}           - The type of node that's getting examined, should match one of the config keys
**/
function test(stringToTest, location, configuration, type) {
  if (stringToTest && (stringToTest.length > configuration[type])) {
    errors.push({message: type + ' name is too long. Length of ' + stringToTest.length + ' is longer than the maximum allowed: ' + configuration[type],
      rule   : name,
      line   : location.line});
  }
}


/**
@function testSteps
@private
@param node          {Gerkin.Step} - A node that represents a scenario, scenario outline or background step
@param configuration {Map}         - The rule configuration 
**/
function testSteps(node, configuration) {
  node.steps.forEach(step => {
    // Check Step name length
    test(step.text, step.location, mergedConfiguration, 'Step');
  });
}


/**
@function run
@description Runs the rule's logic against the provide feature file/object
@alias module:run
@param feature       {Gerkin.Feature} - A Gerkin.Feature object
@param unused        {}               - Unused parameter, exists to conform to the rule run method signature
@param configuration {Object}         - The rule configuration whose format should match `availableConfigs`
@returns             {Array}          - The detected errors
**/
function run(feature, unused, configuration) {
  if (!feature) {
    return [];
  }

  errors = [];
  const mergedConfiguration = _.merge(availableConfigs, configuration);
  
  // Check Feature name length
  test(feature.name, feature.location, mergedConfiguration, 'Feature');

  feature.children.forEach(child => { 
    if (child.background) {
      testSteps(child.background, mergedConfiguration);
    } else {
      test(child.scenario.name, child.scenario.location, mergedConfiguration, 'Scenario');
      testSteps(child.scenario, mergedConfiguration);
    }
  });

  return errors;
}

module.exports = {
  name,
  run,
  availableConfigs
};

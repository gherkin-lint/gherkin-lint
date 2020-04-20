/**
* @module rules/max-scenarios-per-file
**/


//  --- Dependencies --- 
const _ = require('lodash');
// --- Dependencies end ----


/** The name of the rule
* @member {string} name
**/
const name = 'max-scenarios-per-file';


/** 
* The max-scenarios-per-file rule supports the following configuration options:
* <br>- maxScenarios {int} - the maximum scenarios per file after which the rule fails. Defaults to `10`.
* <br>- countOutlineExamples {boolean} - whether to count every example row for a Scenario Outline, 
* as opposed to just 1 for the whole block. Defaults to `true`.
* 
* @example <caption>The rule configuration should look like this</caption> 
* {
*   "max-scenarios-per-file": ["on", {"maxScenarios": 10, "countOutlineExamples": true}]
* }
* @member {Object} availableConfigs
**/
const availableConfigs = {
  'maxScenarios': 10,
  'countOutlineExamples': true
};


/**
* @function run
* @description Runs the rule's logic against the provide feature file/object
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @param unused        {}               - Unused parameter, exists to conform to the rule run method signature
* @param configuration {Object}         - The rule configuration whose format should match `availableConfigs`
* @returns             {Array}          - The detected errors
**/
function run(feature, unused, config) {
  if (!feature) {
    return [];
  }

  let errors = [];
  const mergedConfiguration = _.merge({}, availableConfigs, config);
  const maxScenarios = mergedConfiguration.maxScenarios;
  let count = feature.children.length;

  feature.children.forEach(child => {
    if (child.background) {
      count = count - 1;
    } else if (child.scenario.examples.length  && mergedConfiguration.countOutlineExamples) {
      count = count - 1;
      child.scenario.examples.forEach(example => {
        if (example.tableBody) {
          count = count + example.tableBody.length;
        }
      });
    }
  });

  if (count > maxScenarios) {
    errors.push({
      message: 'Number of scenarios exceeds maximum: ' + count + '/' + maxScenarios,
      rule: name,
      line: 0
    });
  }

  return errors;
}


module.exports = {
  name,
  run,
  availableConfigs,
};

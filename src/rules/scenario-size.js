/**
* @module rules/scenario-size
**/


// --- Dependencies ---
const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');
// --- Dependencies end ---


/** The name of the rule
* @member {string} name
**/
const name = 'scenario-size';


/**
The rule scenario-size lets you specify the maximum number of steps for scenarios and backgrounds.<br>
The `Scenario` configuration applies to both scenarios and scenario outlines.
@example <caption>The rule configuration should look like this</configuration>
{
  "scenario-size": ["on", { "steps-length": { "Background": 15, "Scenario": 15 }}]
}
**/
const availableConfigs = {
  'steps-length': {
    'Background': 15,
    'Scenario': 15
  }
};


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
    return;
  }

  if (_.isEmpty(configuration)) {
    configuration = availableConfigs;
  }

  let errors = [];
  feature.children.forEach((child) => {
    const node = child.background || child.scenario;
    const nodeType = gherkinUtils.getNodeType(node, feature.language);
    const configKey = child.background ? 'Background' : 'Scenario';
    const maxSize = configuration['steps-length'][configKey];

    if (maxSize && node.steps.length > maxSize) {
      errors.push({
        message: `Element ${nodeType} too long: actual ${node.steps.length}, expected ${maxSize}`,
        rule   : name,
        line   : node.location.line
      });
    }
  });

  return errors;
}


module.exports = {
  name,
  run,
  availableConfigs,
};

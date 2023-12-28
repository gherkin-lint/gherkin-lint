const gherkinUtils = require('./utils/gherkin.js');
const rule = 'no-examples-in-scenarios';

function run({feature}) {
  if (!feature) {
    return [];
  }
  let errors = [];
  feature.children.forEach((child) => {
    if (child.scenario) {
      const nodeType = gherkinUtils.getNodeType(child.scenario, feature.language);

      if (nodeType == 'Scenario' && child.scenario.examples.length) {
        errors.push({
          message: 'Cannot use "Examples" in a "Scenario", use a "Scenario Outline" instead',
          rule   : rule,
          line   : child.scenario.location.line,
        });
      }
    }
  });
  return errors;
}

module.exports = {
  name: rule,
  run: run,
};

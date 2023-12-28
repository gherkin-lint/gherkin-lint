const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');
const rule = 'no-scenario-outlines-without-examples';

function run({feature}) {
  if (!feature) {
    return [];
  }

  let errors = [];
  feature.children.forEach(child => {
    if (child.scenario) {
      const scenario = child.scenario;
      const nodeType = gherkinUtils.getNodeType(scenario, feature.language);
      if (nodeType === 'Scenario Outline' &&  (!_.find(scenario.examples, 'tableBody') || !_.find(scenario.examples, 'tableBody')['tableBody'].length)) {
        errors.push({
          message: 'Scenario Outline does not have any Examples',
          rule   : rule,
          line   : scenario.location.line
        });
      }
    }
  });
  return errors;
}

module.exports = {
  name: rule,
  run: run
};

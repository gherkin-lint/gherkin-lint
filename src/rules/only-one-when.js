const gherkinUtils = require('./utils/gherkin.js');

const rule = 'only-one-when';

function run(feature) {
  if (!feature) {
    return [];
  }

  let errors = [];

  function getScenarios(featureChildren) {
    let simpleScenarios = featureChildren
      .filter(child => child.scenario)
      .map(child => child.scenario);

    let ruleScenarios = featureChildren
      .filter(child => child.rule)
      .map(child => child.rule.children)
      .reduce((flattened, element) => flattened.concat(element), [])
      .filter(grandchild => grandchild.scenario)
      .map(grandchild => grandchild.scenario);

    return simpleScenarios.concat(ruleScenarios);
  }

  let scenarios = getScenarios(feature.children);

  scenarios.forEach(scenario => {
    let lastRealKeyword = '';
    let whenCount = 0;
    scenario.steps.forEach(step => {
      let keyword = gherkinUtils.getLanguageInsitiveKeyword(step, feature.language);
      if (keyword === 'when' || (keyword === 'and' && lastRealKeyword === 'when')) {
        lastRealKeyword = 'when';
        whenCount++;
      } else {
        lastRealKeyword = keyword;
      }
    });

    if (whenCount > 1) {
      errors.push(createError(scenario, whenCount));
    }
  });

  return errors;
}


function createError(scenario, whenCount) {
  return {
    message: `Scenario "${scenario.name}" contains ${whenCount} When statements (max 1)`,
    rule: rule,
    line: scenario.location.line,
  };
}

module.exports = {
  name: rule,
  run: run,
};

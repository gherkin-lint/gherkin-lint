const _ = require('lodash');
const {dialects} = require('@cucumber/gherkin');

// We use the node's keyword to determine the node's type
// because it's the only way to distinguish a scenario with a scenario outline
function getNodeType(node, language) {
  const key = getLanguageInsitiveKeyword(node, language).toLowerCase();
  const stepKeys = [
    'given',
    'when',
    'then',
    'and',
    'but',
  ];

  if (key === 'feature') {
    return 'Feature';
  } else if (key === 'rule') {
    return 'Rule';
  } else if (key === 'background') {
    return 'Background';
  } else if (key === 'scenario') {
    return 'Scenario';
  } else if (key === 'scenariooutline') {
    return 'Scenario Outline';
  } else if (key === 'examples') {
    return 'Examples';
  } else if (stepKeys.includes(key)) {
    return 'Step';
  }
  return '';
}
 

function getLanguageInsitiveKeyword(node, language) {
  const languageMapping = dialects[language];

  return _.findKey(languageMapping, values => values instanceof Array && values.includes(node.keyword));
}

function getRuleChildren(feature) {
  return (feature.children || [])
    .filter(child => child.rule)
    .reduce((children, child) => children.concat(child.rule.children || []), []);
}

function getAllChildren(feature) {
  return (feature.children || []).concat(getRuleChildren(feature));
}

function getRules(feature) {
  return (feature.children || [])
    .filter(child => child.rule)
    .map(child => child.rule);
}

function getScenarios(feature) {
  return getAllChildren(feature)
    .filter(child => child.scenario)
    .map(child => child.scenario);
}

function getScenariosWithRule(feature) {
  const result = [];

  (feature.children || []).forEach(child => {
    if (child.scenario) {
      result.push({scenario: child.scenario, rule: null});
    }

    if (child.rule) {
      (child.rule.children || []).forEach(ruleChild => {
        if (ruleChild.scenario) {
          result.push({scenario: ruleChild.scenario, rule: child.rule});
        }
      });
    }
  });

  return result;
}

function getBackgrounds(feature) {
  return getAllChildren(feature)
    .filter(child => child.background)
    .map(child => child.background);
}

function getStepContainers(feature) {
  return getBackgrounds(feature).concat(getScenarios(feature));
}

function getTaggableNodes(feature) {
  const nodes = [feature].concat(getRules(feature), getScenarios(feature));
  getScenarios(feature).forEach(scenario => {
    nodes.push(...(scenario.examples || []));
  });
  return nodes;
}


module.exports = {
  getNodeType: getNodeType,
  getLanguageInsitiveKeyword: getLanguageInsitiveKeyword,
  getAllChildren: getAllChildren,
  getRules: getRules,
  getScenarios: getScenarios,
  getScenariosWithRule: getScenariosWithRule,
  getBackgrounds: getBackgrounds,
  getStepContainers: getStepContainers,
  getTaggableNodes: getTaggableNodes,
};

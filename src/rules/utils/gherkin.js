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
  getBackgrounds: getBackgrounds,
  getStepContainers: getStepContainers,
  getTaggableNodes: getTaggableNodes,
};

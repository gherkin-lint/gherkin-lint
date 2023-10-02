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
  let keyword ;
  const languageMapping = dialects[language];
  if (languageMapping !== undefined) {
    keyword = _.findKey(languageMapping, values => values instanceof Array && values.includes(node.keyword));
  }
  return keyword;
}


module.exports = {
  getNodeType: getNodeType,
  getLanguageInsitiveKeyword: getLanguageInsitiveKeyword,
};

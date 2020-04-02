const _ = require('lodash');
const Gherkin = require('gherkin').default;

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
  }  else if (key === 'background') {
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
  const languageMapping = Gherkin.dialects()[language];

  return _.findKey(languageMapping, values => {
    return values instanceof Array && values.indexOf(node.keyword) !== -1;
  });
}


module.exports = {
  getNodeType: getNodeType,
  getLanguageInsitiveKeyword: getLanguageInsitiveKeyword,
};
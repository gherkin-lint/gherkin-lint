/**
* A utility that wraps some of the gherkin package functionality
* @module rules/utils/gherkin
**/


// --- Dependencies ---
const _ = require('lodash');
const Gherkin = require('gherkin').default;
// --- Dependencies end --


/** A function that return a gherkin node's type based on the used keyword because it's the only way to distinguish a scenario with a scenario outline.
* @function getNodeType
* @param node               {Gherkin.Node} - A gherkin node
* @param language           {string}       - Language in which the feature file is written
**/
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
 

/** A function that return a gherkin node's language insensitive keyword.
* @function getNodeType
* @param node               {Gherkin.Node} - A gherkin node
* @param language           {string}       - Language in which the feature file is written
**/
function getLanguageInsitiveKeyword(node, language) {
  const languageMapping = Gherkin.dialects()[language];

  return _.findKey(languageMapping, values => values instanceof Array && values.includes(node.keyword));
}


module.exports = {
  getNodeType,
  getLanguageInsitiveKeyword,
};
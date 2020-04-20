/**
* @module rules/no-restricted-patterns
**/


// --- Dependencies ---
const gherkinUtils = require('./utils/gherkin.js');
// --- Dependencies end ---


/** The name of the rule
* @member {string} name
**/
const name = 'no-restricted-patterns';


// TODO:
// Notes:
// - Step keywords `Given`, `When`, `Then` and `And` should not be included in the patterns.
// - Description violations always get reported in the Feature/Scenario/etc definition line. This is due to the parsed gherkin tree not having information about which line the description appears. 


/**
* The no-restricted-patterns patterns rule can be configured with lists of exact or partial patterns whose matches are dissallowed in:
* <br> - feature name and description
* <br> - background steps
* <br> - scenario and scenario outline name, description and steps
* All patterns are treated as case insensitive. 
*
* @examples <caption>The rule configuration should look like this</caption>
* {
*   "no-restricted-patterns": ["on", {
*     "Global": [
*       "^globally restricted pattern"
*     ],
*     "Feature": [
*       "poor description",
*       "validate",
*       "verify"
*     ],
*     "Background": [
*       "show last response",
*       "a debugging step"
*     ],
*     "Scenario": [
*       "show last response",
*       "a debugging step"
*     ]
*   }]
* }
**/
const availableConfigs = {
  'Global': [],
  'Scenario': [],
  'ScenarioOutline': [],
  'Background': [],
  'Feature': []
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
    return [];
  }
  let errors = [];
  const restrictedPatterns = getRestrictedPatterns(configuration);
  const language = feature.language;

  // Check the feature itself
  checkNameAndDescription(feature, restrictedPatterns, language, errors);

  // Check the feature children
  feature.children.forEach(child => {
    let node = child.background || child.scenario;
    checkNameAndDescription(node, restrictedPatterns, language, errors);

    // And all the steps of each child
    node.steps.forEach(step => {
      checkStepNode(step, node, restrictedPatterns, language, errors);
    });
  });

  return errors;
}


/**
* @function    getRestrictedPatterns
* @description Applies the Global configuration to the per node type config, removes whitespace from config keys
*              and adds the case insensitive flag to all patterns 
* @private
* @param configuration  {Object} - The used defined rule configuration
* @returns              {Object} - An object with node types as its keys and a list of restricted patters for the node type 
*                                  as its values
**/
function getRestrictedPatterns(configuration) {
  // Patterns applied to everything; feature, scenarios, etc.
  let globalPatterns = (configuration.Global || []).map(pattern => new RegExp(pattern, 'i'));

  let restrictedPatterns = {};
  Object.keys(availableConfigs).forEach(key => {
    const resolvedKey = key.toLowerCase().replace(/ /g, '');
    const resolvedConfig = (configuration[key] || []);
    
    restrictedPatterns[resolvedKey] = resolvedConfig.map(pattern => new RegExp(pattern, 'i'));

    restrictedPatterns[resolvedKey] = restrictedPatterns[resolvedKey].concat(globalPatterns);
  });

  return restrictedPatterns;
}


/**
* @function    getRestrictedPatternsForNode
* @description Uses Gherkin locales to extract the node type corresponding to the node keyword and returns the corresponding 
*              restricted patterns
* @private
* @param node               {Gherkin.Feature|Gherkin.Feature.Child} - A gherkin feature or child node
* @param restrictedPatterns {Object}                                - Key value pairs of node type to restricted patterns
* @param language           {string}                                - Language in which the feature file is written
* @returns                  {Array}                                 - An array of restricted patterns corresponding to the node type
**/
function getRestrictedPatternsForNode(node, restrictedPatterns, language) {
  let key = gherkinUtils.getLanguageInsitiveKeyword(node, language).toLowerCase();

  return restrictedPatterns[key];
}


/**
* @function    checkNameAndDescription
* @description Checks a node's name and description for voilations
* @private
* @param node               {Gherkin.Feature|Gherkin.Feature.Child} - A gherkin feature or child node
* @param restrictedPatterns {Object}                                - Key value pairs of node type to restricted patterns
* @param language           {string}                                - Language in which the feature file is written
* @param errors             {Array}                                 - A reference to the array of rule violations
**/
function checkNameAndDescription(node, restrictedPatterns, language, errors) {
  getRestrictedPatternsForNode(node, restrictedPatterns, language)
    .forEach(pattern => {
      check(node, 'name', pattern, language, errors);
      check(node, 'description', pattern, language, errors);
    });
}


/**
* @function    checkStepNode
* @description Checks a steps's text for voilations
* @private
* @param node               {Gherkin.Step}          - A step node
* @param parentNo           {Gherkin.Feature.Child} - The parent node of a step (eg Background, Scenario) which will be used to 
*                                                     determine which rule configuration to use
* @param restrictedPatterns {Object}                - Key value pairs of node type to restricted patterns
* @param language           {string}                - Language in which the feature file is written
* @param errors             {Array}                 - A reference to the array of rule violations
**/
function checkStepNode(node, parentNode, restrictedPatterns, language, errors) {
  // Use the node keyword of the parent to determine which rule configuration to use
  getRestrictedPatternsForNode(parentNode, restrictedPatterns, language)
    .forEach(pattern => {
      check(node, 'text', pattern, language, errors);
    });
}


/**
* @function    check
* @description Checks a steps's text for voilations
* @private
* @param node     {Gherkin.Feature|Gherkin.Feature.Child|Gherkin.Step} - A Gherkin node
* @param property {string}                                             - The name of the property of the node we should test
* @param pattern  {string}                                             - A restricted pattern
* @param language {string}                                             - Language in which the feature file is written
* @param errors   {Array}                                              - A reference to the array of rule violations
**/                            
function check(node, property, pattern, language, errors) {
  if (!node[property]) {
    return;
  }

  let strings = [node[property]];
  const type = gherkinUtils.getNodeType(node, language);

  if (property == 'description') {
    // Descriptions can be multiline, in which case the description will contain escapted 
    // newline characters "\n". If a multiline description matches one of the restricted patterns
    // when the error message gets printed in the console, it will break the message into multiple lines.
    // So let's split the description on newline chars and test each line separately.

    // To make sure we don't accidentally pick up a doubly escaped new line "\\n" which would appear 
    // if a user wrote the string "\n" in a description, let's replace all escaped new lines 
    // with a sentinel, split lines and then restore the doubly escaped new line 
    const escapedNewLineSentinel = '<!gherkin-lint new line sentinel!>';
    const escapedNewLine = '\\n';
    strings = node[property]
      .replace(escapedNewLine, escapedNewLineSentinel)
      .split('\n')
      .map(string => string.replace(escapedNewLineSentinel, escapedNewLine));
  }
  
  for (let i = 0; i < strings.length; i++) {
    // We use trim() on the examined string because names and descriptions can contain 
    // white space before and after, unlike steps
    if (strings[i].trim().match(pattern)) {
      errors.push({
        message: `${type} ${property}: "${strings[i].trim()}" matches restricted pattern "${pattern}"`,
        rule: name,
        line: node.location.line
      });
    }
  } 
}


module.exports = {
  name,
  run,
  availableConfigs,
};

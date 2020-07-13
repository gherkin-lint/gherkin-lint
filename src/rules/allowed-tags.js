/**
* @module rules/allowed-tags
**/
const _ = require('lodash');


/** The name of the rule
* @type string
* @alias module:rules/allowed-tags.name
**/
const name = 'allowed-tags';


/** 
* The allowed-tags rule should be configured with a list of the allowed tags, in order to have an effect.
* @example <caption>The rule configuration should look like this</caption>
* {
*   "allowed-tags": ["on", {"tags": ["@watch", "@wip", "@todo"]}]
* }
* @type Object
* @alias module:rules/allowed-tags.availableConfigs
**/
const availableConfigs = {
  'tags': []
};


/**
* @alias module:rules/allowed-tags.run
* @description Runs the rule's logic against the provide feature file/object
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @param unused        {}               - Unused parameter, exists to conform to the rule run method signature
* @param configuration {Object}         - The rule configuration whose format should match `availableConfigs`
* @returns             {Array}          - The detected errors
* **/
function run(feature, unused, configuration) {
  if (!feature) {
    return [];
  }

  let errors = [];
  const allowedTags = configuration.tags;

  checkTags(feature, allowedTags, errors);

  feature.children.forEach(child => {
    if (child.scenario) {
      checkTags(child.scenario, allowedTags, errors);

      if (child.scenario.examples) {
        child.scenario.examples.forEach(example => {
          checkTags(example, allowedTags, errors);
        });
      }
    }      
  });

  return errors;
}


/**
* @function checkTags
* @private
* @param node        {Gerkin.Feature|Gerkin.Scenario|Gerkin.Example} - A Gherkin object that has tags
* @param allowedTags {Array}                                         - An array of allowedTags
* @param errors      {Array}                                         - A reference to the rule's errors array that gets filled as errors get detected
**/
function checkTags(node, allowedTags, errors) {
  return node.tags
    .filter(tag => !_.includes(allowedTags, tag.name))
    .forEach(tag => {
      errors.push({
        message: 'Not allowed tag ' + tag.name + ' on ' + node.keyword,
        rule   : name,
        line   : tag.location.line
      });
    });
}


module.exports = {
  name,
  run,
  availableConfigs
};

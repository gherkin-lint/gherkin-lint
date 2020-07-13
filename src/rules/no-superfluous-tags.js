/**
* @module rules/no-superfluous-tags
**/


// --- Dependencies ---
const _ = require('lodash');
const gherkinUtils = require('./utils/gherkin.js');
// --- Dependencies end ---


/** The name of the rule
* @member {string} name
**/
const name = 'no-superfluous-tags';


/**
* @function    run
* @description Runs the rule's logic against the provide feature file/object
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @returns             {Array}          - The detected errors
**/
function run(feature) {
  if (!feature) {
    return [];
  }

  let errors = [];

  feature.children.forEach(child => {
    const node = child.background || child.scenario;
    checkTags(node, feature, feature.language, errors);

    if (node.examples) {
      node.examples.forEach(example => {
        checkTags(example, feature, feature.language, errors);
        checkTags(example, node, feature.language, errors);
      });
    }
  });
  return errors;
}


/**
* @function checkTags
* @private
* @param child         {Gerkin.Feature.Child|Gerkin.Example} - A Gherkin node that has a parent (eg Scenario, Example)
* @param child         {Gerkin.Feature|Gerkin.Feature.Child} - A Gherkin node that has children (eg Scenario, Background, Feature)
* @param language      {string}                              - Language in which the feature file is written
* @param errors        {Array}                               - A reference to the rule's errors array that gets filled as errors get detected
**/
function checkTags(child, parent, language, errors) {
  const superfluousTags = _.intersectionBy(child.tags, parent.tags, 'name');
  const childType = gherkinUtils.getNodeType(child, language);
  const parentType = gherkinUtils.getNodeType(parent, language);

  superfluousTags.forEach(tag => {
    errors.push({
      message: `Tag duplication between ${childType} and its corresponding ${parentType}: ${tag.name}`,
      rule   : name,
      line   : tag.location.line
    });
  });
}

module.exports = {
  name,
  run,
};
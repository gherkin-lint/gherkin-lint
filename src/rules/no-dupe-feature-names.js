/**
* @module rules/no-dupe-feature-names
**/


/** The name of the rule
* @member {string} name
**/
const name = 'no-dupe-feature-names';


/** A map of feature-name to relative-path, used to track which feature names are used
* @member {Map} features
* @private 
**/
const features = new Map();


/**
* @function run
* @description Runs the rule's logic against the provide feature file/object
* @alias module:run
* @param feature       {Gerkin.Feature} - A Gerkin.Feature object
* @param file          {Object}         - An Object containing the lines and relative path of the feature file
* @returns             {Array}          - The detected errors
**/
function run(feature, file) {
  if (!feature) {
    return [];
  }
  const key = feature.name;
  let errors = [];
  if (features.has(key)) {
    // Get a string with all the dupes, which we'll use for error reporting
    const dupes = features.get(key).join(', ');
    errors.push({
      message: 'Feature name is already used in: ' + dupes,
      rule   : name,
      line   : feature.location.line
    });
  }
  let newValue = features.get(key) || [];
  newValue.push(file.relativePath);

  features.set(key, newValue);
  return errors;
}

module.exports = {
  name,
  run,
};

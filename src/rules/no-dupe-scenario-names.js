/**
* @module rules/no-dupe-scenario-names
**/


/** The name of the rule
* @member {string} name
**/
const name = 'no-dupe-scenario-names';


/** A map of scenario-name to relative-path, used to track which scenario names are used
* @member {Map} scenarios
* @private 
**/
const scenarios = new Map();


/**
* The no-dupe-scenario-names rule can can be configured to search for duplicates in each individual feature or amongst all feature files.
* By default the rule will search for duplicates in all features.
* @example <caption>Search for duplicates in all features (using the default configuration)</caption>
* {
*   "no-dupe-scenario-names": "on"
* }
* @example <caption>Search for duplicates in all features (using explicit configuration)</caption>
* {
*   "no-dupe-scenario-names": ["on", "anywhere"]
* }
* @example <caption>Search for duplicates in each individual feature (same scenario name in different features won't raise an error)</caption>
* {
*   "no-dupe-scenario-names": ["on", "in-feature"]
* }
* @member {Array} availableConfigs
**/
const availableConfigs = [
  'anywhere',
  'in-feature'
];


/**
* @function    run
* @description Runs the rule's logic against the provide feature file/object
* @param feature         {Gerkin.Feature} - A Gerkin.Feature object
* @param file            {Object}         - An Object containing the lines and relative path of the feature file
* @param [configuration] {String}         - The rule configuration which can be empty or it needs to match one of the availableConfigs
* @returns               {Array}          - The detected errors
**/
function run(feature, file, configuration) {
  if (!feature) {
    return [];
  }

  let errors = [];
  if(configuration === 'in-feature') {
    scenarios.clear();
  }

  feature.children.forEach(child => {
    if (child.scenario) {
      const key = child.scenario.name;
      if (scenarios.has(key)) {
        // Get a string with all the dupes, which we'll use for error reporting
        const dupes = getFileLinePairsAsStr(scenarios.get(key));
        errors.push({
          message: 'Scenario name is already used in: ' + dupes,
          rule   : name,
          line   : child.scenario.location.line
        });
      }
      let newValue = scenarios.get(key) || [];
      newValue.push({
        file: file.relativePath, 
        line: child.scenario.location.line
      });

      scenarios.set(key, newValue);
    }
  });
  
  return errors;
}


/**
* @function getFileLinePairsAsStr
* @private
* @param objects        {Array}  - Array of objects of the form {file: <filename>, line: <scenario name line>}
* @returns              {String} - A string containing the file names and lines associated with the input objects
**/
function getFileLinePairsAsStr(objects) {
  let strings = [];
  objects.forEach(object => {
    strings.push(object.file + ':' + object.line);
  });
  return strings.join(', ');
}


module.exports = {
  name,
  run,
  availableConfigs,
};

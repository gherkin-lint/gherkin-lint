/**
* @module rules/new-line-at-eof
**/
const _ = require('lodash');
const logger = require('./../logger.js');


/** The name of the rule
* @member {string} name
**/
const name = 'new-line-at-eof';


/**
The new-line-at-eof rule can be configured to enforce or disallow new lines at EOF.
@example <caption>Enforce new lines at EOF</caption>
{
  "new-line-at-eof": ["on", "yes"]
}
@example <caption>Disallow new lines at EOF</caption>
{
  "new-line-at-eof": ["on", "no"]
}
@member {Object} availableConfigs
**/
const availableConfigs = [
  'yes',
  'no'
];


/**
@method
@description Runs the rule's logic against the provide feature file/object
@param unused        {}               - Unused parameter, exists to conform to the rule run method signature
@param file          {Array}          - A list of lines that represent the content of the feature file
@param configuration {Object}         - The rule configuration whose format should match `availableConfigs`
@returns             {Array}          - The detected errors
**/
function run(unused, file, configuration) {
  let errors = [];
  if (_.indexOf(availableConfigs, configuration) === -1) {
    logger.boldError(name + ' requires an extra configuration value.\nAvailable configurations: ' + availableConfigs.join(', ') + '\nFor syntax please look at the documentation.');
    process.exit(1);
  }
  
  const hasNewLineAtEOF = _.last(file.lines) === '';
  let errormsg = '';
  if (hasNewLineAtEOF && configuration === 'no') {
    errormsg = 'New line at EOF(end of file) is not allowed';
  } else if (!hasNewLineAtEOF && configuration === 'yes') {
    errormsg = 'New line at EOF(end of file) is required';
  }

  if (errormsg !== '') {
    errors.push({
      message: errormsg,
      rule   : name,
      line   : file.lines.length
    });
  }

  return errors;
}

module.exports = {
  name,
  runn,
  availableConfigs
};

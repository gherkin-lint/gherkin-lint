var fs = require('fs');
var _ = require('lodash');
var rule = 'new-line-at-eof';

var availableConfigs = [
  'yes',
  'no'
];

function newLineAtEOF(unused, fileName, configuration) {
  if (_.indexOf(availableConfigs, configuration) === -1) {
    throw new Error(rule + ' requires an extra configuration value.\nAvailable configurations: ' + availableConfigs.join(', ') + '\nFor syntax please look at the documentation.');
  }

  var fileContent = fs.readFileSync(fileName).toString();
  var hasNewLineAtEOF = fileContent.match(/\r\n|\r|\n$/);
  var errormsg = '';
  if (hasNewLineAtEOF && configuration === 'no')
  {
    errormsg = 'New line at EOF(end of file) is not allowed';
  } else if (!hasNewLineAtEOF && configuration === 'yes') {
    errormsg = 'New line at EOF(end of file) is required';
  }

  if (errormsg !== '') {
    return {message: errormsg,
            rule   : rule,
            line   : fileContent.split(/\r\n|\r|\n/).length};
  }
}

module.exports = {
  name: rule,
  run: newLineAtEOF,
  availableConfigs: availableConfigs
};

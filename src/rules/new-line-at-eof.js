var _ = require('lodash');
var rule = 'new-line-at-eof';

var availableConfigs = [
  'yes',
  'no'
];

function newLineAtEOF(unused, file, configuration) {
  if (_.indexOf(availableConfigs, configuration) === -1) {
    // eslint-disable-next-line no-console
    console.error(rule + ' requires an extra configuration value.\nAvailable configurations: ' + availableConfigs.join(', ') + '\nFor syntax please look at the documentation.');
    process.exit(1);
  }

  var hasNewLineAtEOF = _.last(file.lines) === '';
  var errormsg = '';
  if (hasNewLineAtEOF && configuration === 'no') {
    errormsg = 'New line at EOF(end of file) is not allowed';
  } else if (!hasNewLineAtEOF && configuration === 'yes') {
    errormsg = 'New line at EOF(end of file) is required';
  }

  if (errormsg !== '') {
    return {message: errormsg,
            rule   : rule,
            line   : file.lines.length};
  }
}

module.exports = {
  name: rule,
  run: newLineAtEOF,
  availableConfigs: availableConfigs
};

var fs = require('fs');
var rule = 'new-line-at-eof';

var availableConfigs = [
  "yes",
  "no"
]

function newLineAtEOF(unused, fileName, configuration) {
  var fileContent = fs.readFileSync(fileName).toString();
  var hasNewLineAtEOF = fileContent.match(/(\r\n|\r|\n)+$/);
  var errormsg = '';
  if (hasNewLineAtEOF && configuration === "no")
  {
    errormsg = 'New line at EOF(end of file) is not allowed';
  } else if (!hasNewLineAtEOF && configuration === "yes") {
    errormsg = 'New line at EOF(end of file) is required';
  }

  if (errormsg !== '') {
    return {message: errormsg,
            rule   : rule,
            line   : fileContent.split('\n').length};
  }
}

module.exports = {
  name: rule,
  run: newLineAtEOF,
  availableConfigs: availableConfigs
};

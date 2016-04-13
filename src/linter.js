var fs = require('fs-extra');
var path = require('path');
var Gherkin = require('gherkin');
var parser = new Gherkin.Parser();
var rules; // Cashing list of rules, so that we only load them once

function lint(files, configuration) {
  var output = [];

  files.forEach(function(fileName) {
    var file = fs.readFileSync(fileName, 'utf-8');
    var errors = [];
    try {
      var parsedFile = parser.parse(file);
      errors = runLintRules(parsedFile, fileName, configuration);
    } catch(e) {
      if(e.errors) {
        e.errors.forEach(function(error) {
          errors.push(getFormattedFatalError(error));
       });
     } else {
       throw e;
     }
    }
    var fileBlob = {filePath: fs.realpathSync(fileName), errors: errors};
  output.push(fileBlob);
  });

  return output;
}

function getAllRules(rulesFolder) {
  if (!rules) {
    rules = [];
    fs.readdirSync(path.join(__dirname, 'rules')).forEach(function(file) {
      rules.push(require(path.join(__dirname, 'rules', file)));
    });
  }
  return rules;
}

function doesRuleExist(rule) {
  var rules = getAllRules();
  for (var i = 0; i < rules.length; i ++) {
    if (rules[i].name === rule) {
      return true;
    }
  }
  return false;
}

function getFormattedFatalError(error) {
  var errorLine = error.message.match(/\((\d+):.*/)[1];
  var errorMsg;
  var rule;
  if (error.message.indexOf("got \'Background") > -1) {
    errorMsg = "Multiple 'Background' definitions in the same file are disallowed";
    rule = 'up-to-one-background-per-file';
  } else if(error.message.indexOf("got 'Feature") > -1) {
    errorMsg = "Multiple 'Feature' definitions in the same file are disallowed";
    rule = 'one-feature-per-file';
  } else if(error.message.indexOf("'(1:0): unexpected end of file")) {
    errorMsg = "Empty feature files are disallowed";
    rule = 'no-empty-file';
  } else {
    errorMsg = error.message;
    rule = 'unexpected-error';
  }
  return {message: errorMsg,
          rule   : rule,
          line   : errorLine};
}

function runLintRules(parsedFile, fileName, configuration) {
  var errors = [];
  getAllRules().forEach(function(rule) {
    if (configuration[rule.name] == "on") {
      var error = rule.run(parsedFile, fileName);
      errors = error ? errors.concat(error) : errors;
    }
  });
  return errors;
}

module.exports = {
  lint: lint,
  doesRuleExist: doesRuleExist
};

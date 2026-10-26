const _ = require('lodash');
const {generateMessages} = require('@cucumber/gherkin');
const {IdGenerator, SourceMediaType} = require('@cucumber/messages');
const fs = require('fs');
const rules = require('./rules.js');
const logger = require('./logger.js');

function readAndParseFile(filePath) {
  return new Promise((resolve, reject) => {
    const source = fs.readFileSync(filePath, 'utf8');
    const options = {
      includeGherkinDocument: true,
      includePickles: false,
      includeSource: false,
      newId: IdGenerator.incrementing(),
    };

    try {
      const envelopes = generateMessages(
        source,
        filePath,
        SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN,
        options
      );
      const parsingErrors = envelopes
        .filter(envelope => envelope.parseError)
        .map(envelope => envelope.parseError);

      if (parsingErrors.length) {
        reject(processFatalErrors(parsingErrors));
        return;
      }

      const documentEnvelope = envelopes.find(envelope => envelope.gherkinDocument);
      const file = {
        relativePath: filePath,
        lines: source.split(/\r\n|\r|\n/),
      };
      resolve({
        feature: documentEnvelope ? documentEnvelope.gherkinDocument.feature : undefined,
        file,
      });
    } catch (error) {
      logger.error(`Gherkin emitted an error while parsing ${filePath}: ${error}`);
      reject(processFatalErrors([error]));
    }
  });
}


function lint(files, configuration, additionalRulesDirs) {
  let results = [];

  return Promise.all(files.map((f) => {
    let perFileErrors = [];

    return readAndParseFile(f)
      .then(
        // Handle Promise.resolve 
        ({feature, file}) => {
          perFileErrors = rules.runAllEnabledRules(feature, file, configuration, additionalRulesDirs);
        },
        // Handle Promise.reject 
        (parsingErrors) => {
          perFileErrors = parsingErrors;
        })
      .finally(()=> {
        let fileBlob = {
          filePath: fs.realpathSync(f), 
          errors: _.sortBy(perFileErrors, 'line')
        };

        results.push(fileBlob);
      });
  })).then(() => results);
}

function processFatalErrors(errors) {
  const firstError = errors[0];
  const firstMessage = getErrorMessage(firstError);

  // A tag before a Background causes cascading parser errors. Report the root
  // cause once instead of emitting every recovery error that follows it.
  if (firstMessage.includes('got \'Background') &&
      firstMessage.includes('expected: #TagLine, #RuleLine')) {
    return [{
      message: 'Tags on Backgrounds are disallowed',
      rule: 'no-tags-on-backgrounds',
      line: getErrorLine(firstError)
    }];
  }

  return errors.map(getFormattedFatalError);
}


/*eslint no-console: "off"*/
function getFormattedFatalError(error) {
  const errorData = getErrorMessage(error);
  const errorLine = getErrorLine(error);
  let errorMsg;
  let rule;
  if (errorData.includes('got \'Background')) {
    errorMsg = 'Multiple "Background" definitions in the same Feature or Rule are disallowed';
    rule = 'up-to-one-background-per-scope';
  } else if(errorData.includes('got \'Feature')) {
    errorMsg = 'Multiple "Feature" definitions in the same file are disallowed';
    rule = 'one-feature-per-file';
  } else if (
    errorData.includes('expected: #EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ScenarioLine, #RuleLine, #Comment, #Empty, got') ||
    errorData.includes('expected: #EOF, #TableRow, #DocStringSeparator, #StepLine, #TagLine, #ExamplesLine, #ScenarioLine, #RuleLine, #Comment, #Empty, got')
  ) {
    errorMsg = 'Steps should begin with "Given", "When", "Then", "And" or "But". Multiline steps are disallowed';
    rule = 'no-multiline-steps';

  } else {
    errorMsg = errorData;
    rule = 'unexpected-error';
  }
  return {message: errorMsg,
    rule   : rule,
    line   : errorLine};
}

function getErrorMessage(error) {
  return error.message || error.data || String(error);
}

function getErrorLine(error) {
  if (error.source && error.source.location) {
    return error.source.location.line;
  }
  const match = getErrorMessage(error).match(/\((\d+):/);
  return match ? Number(match[1]) : 0;
}

module.exports = {
  lint: lint,
  readAndParseFile: readAndParseFile
};

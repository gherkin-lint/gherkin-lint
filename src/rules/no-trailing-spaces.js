const rule = 'no-trailing-spaces';
const {getStepContainers} = require('./utils/gherkin.js');

function getDocStringStartLines(feature) {
  if (!feature) {
    return new Set();
  }

  return new Set(getStepContainers(feature).reduce((lines, container) => {
    (container.steps || []).forEach(step => {
      if (step.docString) {
        lines.push(step.docString.location.line);
      }
    });
    return lines;
  }, []));
}

function run(feature, file) {
  let errors = [];
  let lineNo = 1;
  let docStringDelimiter;
  const docStringStartLines = getDocStringStartLines(feature);

  file.lines.forEach(line => {
    const trimmedLine = line.trim();
    const isClosingDelimiter = docStringDelimiter &&
      trimmedLine.startsWith(docStringDelimiter);
    const isIndentedBlankDocStringLine = docStringDelimiter &&
      !isClosingDelimiter && /^[\t ]+$/.test(line);

    if (!isIndentedBlankDocStringLine && /[\t ]+$/.test(line)) {
      errors.push({message: 'Trailing spaces are not allowed',
        rule   : rule,
        line   : lineNo});
    }

    if (isClosingDelimiter) {
      docStringDelimiter = undefined;
    } else if (docStringStartLines.has(lineNo)) {
      const openingDelimiter = line.trimStart().match(/^("""|```)/);
      docStringDelimiter = openingDelimiter && openingDelimiter[1];
    }

    lineNo++;
  });
  
  return errors;
}

module.exports = {
  name: rule,
  run: run
};

const gherkinUtils = require('./utils/gherkin.js');

const rule = 'keywords-in-logical-order';

function run(feature) {
  if (!feature) {
    return [];
  }

  let errors = [];

  feature.children.forEach((child) => {
    const node = child.background || child.scenario;
    const keywordList = ['given', 'when', 'then'];

    let maxKeywordPosition = undefined;

    node && node.steps.forEach((step) => {
      const keyword = gherkinUtils.getLanguageInsitiveKeyword(
        step,
        feature.language
      );
      let keywordPosition = keywordList.indexOf(keyword);

      if (keywordPosition === -1) {
        // not found
        return;
      }

      if (keywordPosition < maxKeywordPosition) {
        let maxKeyword = keywordList[maxKeywordPosition];
        // console.log(createError(step, maxKeyword));
        errors.push(createError(step, maxKeyword));
      }

      maxKeywordPosition =
        Math.max(maxKeywordPosition, keywordPosition) || keywordPosition;
    });
  });

  return errors;
}

function createError(step, maxKeyword) {
  return {
    message:
      'Step "' +
      step.keyword +
      step.text +
      '" should not appear after step using keyword ' +
      maxKeyword,
    rule: rule,
    line: step.location.line,
  };
}

module.exports = {
  name: rule,
  run: run,
};

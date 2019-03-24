const rule = 'no-empty-file';

const noEmptyFiles = (feature) => {
  return Object.keys(feature).length ? [] : [{
    message: 'Empty feature files are disallowed',
    rule: rule,
    line: 1,
  }];
};

module.exports = {
  name: rule,
  run: noEmptyFiles,
  isValidConfig: () => true,
  suppressOtherRules: true,
};

const rule = 'no-empty-background';

const createError = (background) => {
  return {
    message: 'Empty backgrounds are not allowed.',
    rule: rule,
    line: background.location.line,
  };
};

const noEmptyBackground = (feature) => {
  const children = feature.children || [];
  const firstChild = children[0] || {};

  return firstChild.type === 'Background' && firstChild.steps.length === 0
    ? [createError(firstChild)]
    : [];
};

module.exports = {
  name: rule,
  run: noEmptyBackground,
  isValidConfig: () => true,
};

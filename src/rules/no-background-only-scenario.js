const rule = 'no-background-only-scenario';

const createError = (background) => ({
  message: 'Backgrounds are not allowed when there is just one scenario.',
  rule: rule,
  line: background.location.line,
});

const noBackgroundEmptyScenario = (feature) => {
  const children = feature.children || [];
  const firstChild = children[0] || {};

  return firstChild.type === 'Background' && children.length <= 2
    ? [createError(firstChild)]
    : [];
};

module.exports = {
  name: rule,
  run: noBackgroundEmptyScenario,
  isValidConfig: () => true,
};

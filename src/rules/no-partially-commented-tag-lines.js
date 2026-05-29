const rule = 'no-partially-commented-tag-lines';

function run(feature, file) {
  if (!feature) {
    return [];
  }

  let errors = [];
  const lines = file ? file.lines : [];
  const seenLines = new Set();

  checkTags(feature, lines, seenLines, errors);
  feature.children.forEach(child => {
    if (child.scenario) {
      checkTags(child.scenario, lines, seenLines, errors);

      child.scenario.examples.forEach(example => {
        checkTags(example, lines, seenLines, errors);
      });
    }
  });

  return errors;
}

function checkTags(node, lines, seenLines, errors) {
  node.tags.forEach(tag => {
    const lineNum = tag.location.line;
    if (seenLines.has(lineNum)) return;
    const rawLine = lines[lineNum - 1] || '';
    if (rawLine.indexOf('#') >= 0) {
      seenLines.add(lineNum);
      errors.push({
        message: 'Partially commented tag lines not allowed',
        rule   : rule,
        line   : lineNum
      });
    }
  });
}

module.exports = {
  name: rule,
  run: run
};

const rule = 'no-trailing-spaces';

function run({file}) {
  let errors = [];
  let lineNo = 1;
  file.lines.forEach(line => {
    if (/[\t ]+$/.test(line)) {
      errors.push({message: 'Trailing spaces are not allowed',
        rule   : rule,
        line   : lineNo});
    }

    lineNo++;
  });

  return errors;
}

module.exports = {
  name: rule,
  run: run
};

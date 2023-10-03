const rule = 'no-trailing-spaces';

function run(unused, file) {
  let errors = [];
  let lineNo = 1;
  file.lines.forEach(line => {
    if (/[\t ]+$/.test(line)) {
      errors.push({message: 'Trailing spaces are not allowed',
        rule   : rule,
        line   : lineNo,
        column : 0,
      });
    }

    lineNo++;
  });

  return errors;
}

module.exports = {
  name: rule,
  run: run
};

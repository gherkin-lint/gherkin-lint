var rule = 'no-unamed-features';

function noUnamedFeatures(parsedFile) {
  if (!parsedFile || !parsedFile.name) {
    return {message: 'Missing Feature name',
            rule   : rule,
            line   : parsedFile.location && parsedFile.location.line || 0};
  }
}

module.exports = {
  name: rule,
  run: noUnamedFeatures
};

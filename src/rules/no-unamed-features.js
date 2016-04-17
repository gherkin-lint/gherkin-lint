var rule = "no-unamed-features";

function noUnamedFeatures(parsedFile) {
  if (!parsedFile.name) {
  return {message: "Missing Feature name",
          rule   : rule,
          line   : parsedFile.location.line};
  }
}

module.exports = {
  name: rule,
  run: noUnamedFeatures
};

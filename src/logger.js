/* eslint-disable no-console */

function boldError(msg) {
  console.error(`\x1b[31m\x1b[1m${msg}\x1b[0m`);
}

function error(msg) {
  console.error(`\x1b[31m${msg}\x1b[0m`);
}

module.exports = {
  error: error,
  boldError: boldError
};

function countErrors(results) {
  let total = 0;
  for (let result of results) {
    total += result.errors.length;
  }
  return total;
}

module.exports = { countErrors };

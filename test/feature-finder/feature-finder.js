const assert = require('chai').assert;
const featureFinder = require('../../src/feature-finder.js');

describe('Feature finder', function() {
  it('does not return duplicates', function() {
    const actual = featureFinder.getFeatureFiles([
      'test/feature-finder/fixtures',
      'test/feature-finder',
    ]);
    assert.equal(actual.isSuccess(), true);
    assert.deepEqual(actual.getSuccesses(), ['test/feature-finder/fixtures/a.feature']);
  });

  it('ignores files when the --ignore argument is provided', function() {
    const actual = featureFinder.getFeatureFiles(['test/feature-finder/**'],
      ['test/feature-finder/**']);
    assert.equal(actual.isSuccess(), true);
    assert.deepEqual(actual.getSuccesses(), []);
  });

  it('ignores files in the .gherkin-lintignore', function() {
    featureFinder.defaultIgnoreFileName = 'test/feature-finder/fixtures/**';
    const actual = featureFinder.getFeatureFiles(['test/feature-finder/**']);
    assert.equal(actual.isSuccess(), true);
    assert.deepEqual(actual.getSuccesses(), []);
  });
});

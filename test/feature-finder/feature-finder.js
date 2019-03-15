const assert = require('chai').assert;
const featureFinder = require('../../dist/feature-finder.js');

describe('Feature finder', function() {
  it('does not return duplicates', function() {
    const actual = featureFinder.getFeatureFiles([
      'test/feature-finder/fixtures',
      'test/feature-finder',
    ]);
    assert.deepEqual(actual, ['test/feature-finder/fixtures/a.feature']);
  });

  it('ignores files when the --ignore argument is provided', function() {
    const actual = featureFinder.getFeatureFiles(['test/feature-finder/**'],
      ['test/feature-finder/**']);
    assert.deepEqual(actual, []);
  });

  it('ignores files in the .gherkin-lintignore', function() {
    featureFinder.defaultIgnoreFileName = 'test/feature-finder/fixtures/**';
    const actual = featureFinder.getFeatureFiles(['test/feature-finder/**']);
    assert.deepEqual(actual, []);
  });
});

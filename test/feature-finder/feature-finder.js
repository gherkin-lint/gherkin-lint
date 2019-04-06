const assert = require('chai').assert;
const FeatureFinder = require('../../src/feature-finder.js');
const path = require('path');

describe('Feature finder', function() {
  it('does not return duplicates', function() {
    const featureFinder = new FeatureFinder([
      'test/feature-finder/fixtures',
      'test/feature-finder',
    ]);
    const actual = featureFinder.getFeatureFiles();
    const expectedFeature = 'test/feature-finder/fixtures/a.feature';
    assert.equal(actual.isSuccess(), true);
    assert.deepEqual(actual.getSuccesses(), [{
      content: 'content',
      lines: [
        'content',
      ],
      name: 'test/feature-finder/fixtures/a.feature',
      path: path.join(process.cwd(), expectedFeature),
    }]);
  });

  it('ignores files when the --ignore argument is provided', function() {
    const featureFinder = new FeatureFinder(
      ['test/feature-finder/**'],
      ['test/feature-finder/**']
    );
    const actual = featureFinder.getFeatureFiles();
    assert.equal(actual.isSuccess(), true);
    assert.deepEqual(actual.getSuccesses(), []);
  });

  it('ignores files in the .gherkin-lintignore', function() {
    const featureFinder = new FeatureFinder(['test/feature-finder/**']);
    const actual = featureFinder.getFeatureFiles();
    assert.equal(actual.isSuccess(), true);
    assert.deepEqual(actual.getSuccesses(), []);
  });
});

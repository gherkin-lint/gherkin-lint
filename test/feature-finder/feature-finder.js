const assert = require('chai').assert;
const featureFinder = require('../../src/feature-finder.js');
const path = require('path');

describe('Feature finder', function() {
  it('does not return duplicates', function() {
    const actual = featureFinder.getFeatureFiles([
      'test/feature-finder/fixtures',
      'test/feature-finder',
    ]);
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

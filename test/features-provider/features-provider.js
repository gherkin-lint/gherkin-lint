const assert = require('chai').assert;
const FeaturesProvider = require('../../src/features-provider.js');
const path = require('path');

describe('Feature finder', function() {
  it('does not return duplicates', function() {
    const featureFinder = new FeaturesProvider([
      'test/features-provider/fixtures',
      'test/features-provider',
    ]);
    const actual = featureFinder.provide();
    const expectedFeature = 'test/features-provider/fixtures/a.feature';
    assert.equal(actual.isSuccess(), true);
    assert.deepEqual(actual.getSuccesses(), [{
      content: 'content',
      lines: [
        'content',
      ],
      name: 'test/features-provider/fixtures/a.feature',
      path: path.join(process.cwd(), expectedFeature),
    }]);
  });

  it('ignores files when the --ignore argument is provided', function() {
    const featureFinder = new FeaturesProvider(
      ['test/features-provider/**'],
      ['test/features-provider/**']
    );
    const actual = featureFinder.provide();
    assert.equal(actual.isSuccess(), true);
    assert.deepEqual(actual.getSuccesses(), []);
  });

  it('ignores files in the .gherkin-lintignore', function() {
    const featureFinder = new FeaturesProvider(['test/features-provider/**']);
    const actual = featureFinder.provide();
    assert.equal(actual.isSuccess(), true);
    assert.deepEqual(actual.getSuccesses(), []);
  });
});

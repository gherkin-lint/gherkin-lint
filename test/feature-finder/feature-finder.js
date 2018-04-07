var assert = require('chai').assert;
var featureFinder = require('../../dist/feature-finder.js');

describe('Feature finder', function() {
  it('does not return duplicates', function() {
    var actual = featureFinder.getFeatureFiles([
      'test/feature-finder/fixtures',
      'test/feature-finder'
    ]);
    assert.deepEqual(actual, ['test/feature-finder/fixtures/a.feature']);
  });
});

const assert = require('chai').assert;
const {Successes, Failures} = require('../src/successes-failures');

let values;
let otherValues;
let errors;
let otherErrors;

beforeEach(() => {
  values = [1, 2];
  otherValues = [3, 4];
  errors = [
    'a',
    'b',
  ];
  otherErrors = [
    'c',
    'd',
  ];
});

describe('Successes', () => {
  describe('of', () => {
    it('getSuccesses returns the values', () => {
      assert.deepEqual(Successes.of(values).getSuccesses(), [1, 2]);
    });

    it('getFailures does not return errors', () => {
      assert.deepEqual(Successes.of(values).getFailures(), []);
    });
  });

  describe('isSuccess', () => {
    it('returns true', () => {
      assert.equal(Successes.of(values).isSuccess(), true);
    });
  });

  describe('append', () => {
    context('when it appends successes', () => {
      it('getSuccesses returns the concatenation of successes', () => {
        const result = Successes.of(values).append(Successes.of(otherValues));
        assert.deepEqual(result.getSuccesses(), [1, 2, 3, 4]);
      });

      it('getFailures does not return errors', () => {
        const result = Successes.of(values).append(Successes.of(otherValues));
        assert.deepEqual(result.getFailures(), []);
      });
    });

    context('when it appends failures', () => {
      it('getSuccesses does not return successes', () => {
        const result = Successes.of(values).append(Failures.of(errors));
        assert.deepEqual(result.getSuccesses(), []);
      });

      it('getFailures returns the same errors as errors appended', () => {
        const result = Successes.of(values).append(Failures.of(errors));
        assert.deepEqual(result.getFailures(), ['a', 'b']);
      });
    });
  });
});

describe('Failures', () => {
  describe('of', () => {
    it('getSuccesses does not return values', () => {
      assert.deepEqual(Failures.of(errors).getSuccesses(), []);
    });

    it('getFailures does not return errors', () => {
      assert.deepEqual(Failures.of(errors).getFailures(), ['a', 'b']);
    });
  });

  describe('isSuccess', () => {
    it('returns false', () => {
      assert.equal(Failures.of(errors).isSuccess(), false);
    });
  });

  describe('append', () => {
    context('when it appends successes', () => {
      it('getSuccesses does not return errors', () => {
        const result = Failures.of(errors).append(Successes.of(values));
        assert.deepEqual(result.getSuccesses(), []);
      });

      it('getSuccesses returns the errors and ignores successes', () => {
        const result = Failures.of(errors).append(Successes.of(values));
        assert.deepEqual(result.getFailures(), ['a', 'b']);
      });
    });

    context('when it appends failures', () => {
      it('getSuccesses does not return successes', () => {
        const result = Failures.of(errors).append(Failures.of(otherErrors));
        assert.deepEqual(result.getSuccesses(), []);
      });

      it('getFailures returns the concatenation of errors', () => {
        const result = Failures.of(errors).append(Failures.of(otherErrors));
        assert.deepEqual(result.getFailures(), ['a', 'b', 'c', 'd']);
      });
    });
  });
});

const expect = require('chai').expect;
const {Successes, Failures} = require('../../src/successes-failures');
const Linter = require('../../src/linter/');

const firstNameFeature = 'first.feature';
const secondNameFeature = 'second.feature';
const pathToFirstFeature = `path/to/${firstNameFeature}`;
const pathToSecondFeature = `path/to/${secondNameFeature}`;

const configProviderFailures = [{
  message: 'config error 1',
}, {
  message: 'config error 2',
}];

const successfulConfigProvider = {
  provide() {
    return Successes.of({});
  },
};

const failedConfigProvider = {
  provide() {
    return Failures.of(configProviderFailures);
  },
};

const rulesParserFailures = [{
  message: 'rule error',
}];

const successfulRulesParser = {
  parse() {
    return Successes.of({});
  },
};

const failedRulesParser = {
  parse() {
    return Failures.of(rulesParserFailures);
  },
};

const featureFinderFailures = [{
  message: 'feature not found',
}];

const firstFile = {
  name: firstNameFeature,
  path: pathToFirstFeature,
};

const secondFile = {
  name: secondNameFeature,
  path: pathToSecondFeature,
};

const successfulFeatureFinder = {
  provide() {
    return Successes.of([firstFile, secondFile]);
  },
};

const failedFeatureFinder = {
  provide() {
    return Failures.of(featureFinderFailures);
  },
};

const createSuccessfulFileLinter = (config = {}) => ({
  lint(file) {
    return config[file.name] || [];
  },
});

describe('Linter', () => {
  describe('lint', () => {
    context('when config provider fails', () => {
      it('returns config provider errors', () => {
        const linter = new Linter(
          failedConfigProvider,
          successfulRulesParser,
          successfulFeatureFinder,
          createSuccessfulFileLinter()
        );

        const result = linter.lint();
        expect(result.isSuccess()).to.be.equal(false);
        expect(result.getFailures()).to.be.equal(configProviderFailures);
      });
    });

    context('when rules parser fails', () => {
      it('returns config provider errors', () => {
        const linter = new Linter(
          successfulConfigProvider,
          failedRulesParser,
          successfulFeatureFinder,
          createSuccessfulFileLinter()
        );

        const result = linter.lint();
        expect(result.isSuccess()).to.be.equal(false);
        expect(result.getFailures()).to.be.equal(rulesParserFailures);
      });
    });

    context('when feature finder fails', () => {
      it('returns config provider errors', () => {
        const linter = new Linter(
          successfulConfigProvider,
          successfulRulesParser,
          failedFeatureFinder,
          createSuccessfulFileLinter()
        );

        const result = linter.lint();
        expect(result.isSuccess()).to.be.equal(false);
        expect(result.getFailures()).to.be.equal(featureFinderFailures);
      });
    });

    context('fileLinter returns errors', () => {
      it('returns the errors of each file', () => {
        const errorsFirstFeature = [{
          message: 'error 1',
        }, {
          message: 'error 2',
        }];
        const errorsSecondFeature = [];
        const linter = new Linter(
          successfulConfigProvider,
          successfulRulesParser,
          successfulFeatureFinder,
          createSuccessfulFileLinter({
            [firstNameFeature]: errorsFirstFeature,
            [secondNameFeature]: errorsSecondFeature,
          })
        );

        const result = linter.lint();
        expect(result.isSuccess()).to.be.equal(false);
        expect(result.getFailures()).to.be.deep.equal([{
          errors: errorsFirstFeature,
          message: firstFile.path,
          type: 'lint-failures',
        }]);
      });
    });

    context('fileLinter does not return errors', () => {
      it('returns an empty array', () => {
        const linter = new Linter(
          successfulConfigProvider,
          successfulRulesParser,
          successfulFeatureFinder,
          createSuccessfulFileLinter({
            [firstNameFeature]: [],
            [secondNameFeature]: [],
          })
        );

        const result = linter.lint();
        expect(result.isSuccess()).to.be.equal(true);
        expect(result.getSuccesses()).to.be.deep.equal([]);
      });
    });
  });
});

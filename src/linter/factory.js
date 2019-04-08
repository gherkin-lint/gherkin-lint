const Linter = require('./');
const FeaturesProvider = require('../features-provider.js');
const ConfigProvider = require('../config-provider.js');
const RulesProvider = require('../rules-provider');
const RulesParser = require('../rules-parser');
const formatterFactory = require('../formatters/formatter-factory');
const NoConfigurableLinter = require('./no-configurable-linter');
const ConfigurableLinter = require('./configurable-linter');
const Gherkin = require('gherkin');

const linterFactory = ({format, ignore, config, rulesDirs, args}) => {
  const parser = new Gherkin.Parser();
  const formatter = formatterFactory(format);
  const noConfigurableFileLinter = new NoConfigurableLinter(parser);
  const configurableFileLinter = new ConfigurableLinter(noConfigurableFileLinter);
  const rulesProvider = new RulesProvider(rulesDirs);
  const rulesParser = new RulesParser(rulesProvider.provide());
  const featuresProvider = new FeaturesProvider(args, ignore);
  const configProvider = new ConfigProvider(config);
  const linter = new Linter(
    configProvider,
    rulesParser,
    featuresProvider,
    configurableFileLinter
  );

  return {
    lint() {
      const results = linter.lint();
      const successful = results.isSuccess();
      const failures = successful ? results.getSuccesses() : results.getFailures();
      return {
        logType: successful ? 'log' : 'error',
        errorLines: formatter.format(failures),
        exit: failures.length > 0 ? 1 : 0,
      };
    },
  };
};

module.exports = linterFactory;

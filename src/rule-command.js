class RuleCommand {
  constructor({
    name,
    run,
    init = () => {},
    config = {},
    suppressOtherRules = false,
  }) {
    this.name = name;
    this.run = run;
    this.options = Object.assign({}, init());
    this.config = config;
    this.suppressOtherRules = suppressOtherRules;
  }

  execute({feature, file}) {
    return this.run(feature, file, this.config);
  }

  hasPriority() {
    return this.suppressOtherRules;
  }
}

module.exports = RuleCommand;

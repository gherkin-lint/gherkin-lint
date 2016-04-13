# Gherkin linter

Uses [Gherkin](https://github.com/cucumber/gherkin-javascript) to parse feature files and runs linting against the default rules, and the optional rules you specified in your `.gherkin-lint-rc` file.

## Available rules
Source code of the rules can be found in `scr/rules`.

Default:
- Disallow multiple Feature definitions in the same file.
- Disallow multiple Background definition in the same file.
- Disallow empty feature files.

Optional:
- Disallow files with no scenarios.
- Disallow empty Feature name.
- Disallow empty Scenario name.
- Disallow duplicate Feature names.
- Disallow duplicate Scenario names.

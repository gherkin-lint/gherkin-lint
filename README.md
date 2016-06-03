# Gherkin lint

Uses [Gherkin](https://github.com/cucumber/gherkin-javascript) to parse feature files and runs linting against the default rules, and the optional rules you specified in your `.gherkin-lintrc` file.

## Installation
```
npm install gherkin-lint

```

## Demo
To see the output for all the errors that the linter can detect run:
```
git clone https://github.com/vsiakka/gherkin-lint.git
npm run demo
```
Or check this:
![console](http://i.imgur.com/YaH4Anu.png)


## Available rules

| Name                           | Functionality                                             | Configurable |
|------------------------------------|-----------------------------------------------------------|:------------:|
| `one-feature-per-file`             | Disallows multiple Feature definitions in the same file   | no*          |
| `up-to-one-background-per-file`    | Disallows multiple Background definition in the same file | no*          |
| `no-empty-file`                    | Disallows empty feature files                             | no*          |
| `no-tags-on-backgrounds`           | Disallows tags on Background                              | no*          |
| `no-files-without-scenarios`       | Disallows files with no scenarios                         | yes          |
| `no-unamed-features`               | Disallows empty Feature name                              | yes          |
| `no-unamed-scenarios`              | Disallows empty Scenario name                             | yes          |
| `no-dupe-feature-names`            | Disallows duplicate Feature names                         | yes          |
| `no-dupe-scenario-names`           | Disallows duplicate Scenario names                        | yes          |
| `no-partially-commented-tag-lines` | Disallows partially commented tag lines                   | yes          |
| `indentation`                      | Allows the user to specify indentation rules              | yes          |

\* These rules cannot be turned off because they detect undocumented cucumber functionality that causes the [gherkin](https://github.com/cucumber/gherkin-javascript) parser to crash.

## Rule Configuration
The not-configurable rules are turned on by default and cannot be turned off. Configurable rules can be customized using a [file](#configuration-file).

The configurable rules are off by default. To turn them on, you will need to create a json file, where you specify the name of each rule and its desired state (which can be "on" or "off"). Eg:
```
{
  "no-unamed-features": "on"
}
```
will turn on the `no-unamed-features` rule.

`indentation` can be configured in a more granular level and uses following rules by default:
- Expected indentation for Feature, Background, Scenario: 0 spaces
- Expected indentation for Steps: 2 spaces

You can override the defaults for `indentation` like this:
```
{
  "indentation" : "on", { "feature": 0, "background": 0, "scenario": 0, "step": 2 }
}
```

## Configuration File
The default name for the configuration file is `.gherkin-lintrc` and it's expected to be in your working directory.     

If you are using a file with a different name or a file in a different folder, you will need to specify the `-c` or `--config` option and pass in the relative path to your configuration file. Eg: `gherkin-lint -c path/to/configuration/file.extention`

You can find an example configuration file, that turns on all of the rules in the root of this repo (.gherkin-lintrc).

## Ignoring Files
There are 2 ways you can specify files that the linter should ignore:
1. Add a `.gherkin-lintignore` file in your working directory and specify one glob pattern per file line
1. Use the command line option`-i` or `--ignore`,  pass in a comma separated list of glob patterns. If specified, the command line option will override the `.gherkin-lintignore` file.

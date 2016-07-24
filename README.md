# Gherkin lint
[![Travis](https://img.shields.io/travis/vsiakka/gherkin-lint.svg?maxAge=2592000)](https://travis-ci.org/vsiakka/gherkin-lint/)
[![David](https://img.shields.io/david/vsiakka/gherkin-lint.svg?maxAge=2592000)](https://david-dm.org/vsiakka/gherkin-lint)
[![David](https://img.shields.io/david/dev/vsiakka/gherkin-lint.svg?maxAge=2592000)](https://david-dm.org/vsiakka/gherkin-lint#info=devDependencies&view=table)
[![npm](https://img.shields.io/npm/v/gherkin-lint.svg?maxAge=2592000)](https://www.npmjs.com/package/gherkin-lint)

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

| Name                                    | Functionality                                             | Configurable |
|-----------------------------------------|-----------------------------------------------------------|:------------:|
| `no-tags-on-backgrounds`                | Disallows tags on Background                              | no*          |
| `one-feature-per-file`                  | Disallows multiple Feature definitions in the same file   | no*          |
| `up-to-one-background-per-file`         | Disallows multiple Background definition in the same file | no*          |
| `indentation`                           | Allows the user to specify indentation rules              | yes          |
| `no-dupe-feature-names`                 | Disallows duplicate Feature names                         | yes          |
| `no-dupe-scenario-names`                | Disallows duplicate Scenario names                        | yes          |
| `no-empty-file`                         | Disallows empty feature files                             | yes          |
| `no-files-without-scenarios`            | Disallows files with no scenarios                         | yes          |
| `no-multiple-empty-lines`               | Disallows multiple empty lines                            | yes          |
| `no-partially-commented-tag-lines`      | Disallows partially commented tag lines                   | yes          |
| `no-trailing-spaces`                    | Disallows trailing spaces                                 | yes          |
| `no-unamed-features`                    | Disallows empty Feature name                              | yes          |
| `no-unamed-scenarios`                   | Disallows empty Scenario name                             | yes          |
| `new-line-at-eof`                       | Disallows/enforces new line at EOF                        | yes          |
| `no-scenario-outlines-without-examples` | Disallows scenario outlines without examples              | yes          |

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
`Step` will be used as a fallback if the keyword of the step is not specified.  
This feature is able to handle all localizations of the gherkin steps.
```
{
  "indentation" : ["on", { "Feature": 0, "Background": 0, "Scenario": 0, "Step": 2, "given": 2, "and": 3 }]
}
```

`new-line-at-eof` can also be configured to enforcing or disallowing new lines at EOF.
- To enforce new lines at EOF:
```
{
  "new-line-at-eof": ["on", "yes"]
}
```
- To disallow new lines at EOF:
```
{
  "new-line-at-eof": ["on", "no"]
}
```

## Configuration File
The default name for the configuration file is `.gherkin-lintrc` and it's expected to be in your working directory.     

If you are using a file with a different name or a file in a different folder, you will need to specify the `-c` or `--config` option and pass in the relative path to your configuration file. Eg: `gherkin-lint -c path/to/configuration/file.extention`

You can find an example configuration file, that turns on all of the rules in the root of this repo (.gherkin-lintrc).

## Ignoring Feature Files
There are 2 ways you can specify files that the linter should ignore:
1. Add a `.gherkin-lintignore` file in your working directory and specify one glob pattern per file line
1. Use the command line option`-i` or `--ignore`,  pass in a comma separated list of glob patterns. If specified, the command line option will override the `.gherkin-lintignore` file.

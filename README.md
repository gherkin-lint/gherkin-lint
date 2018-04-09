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


| Name                                        | Functionality                                                                            |
|---------------------------------------------|------------------------------------------------------------------------------------------|
| `no-tags-on-backgrounds` *                  | Disallows tags on Background                                                             |
| `one-feature-per-file` *                    | Disallows multiple Feature definitions in the same file                                  |
| `up-to-one-background-per-file` *           | Disallows multiple Background definition in the same file                                |
| `no-multiline-steps` *                      | Disallows mutiline Steps                                                                 |
| `no-examples-in-scenarios`                  | Disallow the use of "Examples" in scenarios                                              |
| &nbsp;                                      |                                                                                          |
| [`indentation`](#indentation)               | Allows the user to specify indentation rules                                             |
| [`name-length`](#name-length)               | Allows restricting length of Feature/Scenario/Step names                                 |
| [`new-line-at-eof`](#new-line-at-eof)       | Disallows/enforces new line at EOF                                                       |
| `no-dupe-feature-names`                     | Disallows duplicate Feature names                                                        |
| `no-dupe-scenario-names`                    | Disallows duplicate Scenario names                                                       |
| `no-duplicate-tags`                         | Disallows duplicate tags on the same Feature or Scenario                                 |
| `no-empty-file`                             | Disallows empty feature files                                                            |
| `no-files-without-scenarios`                | Disallows files with no scenarios                                                        |
| `no-homogenous-tags`                        | Disallows tags present on every Scenario in a Feature, rather than on the Feature itself |
| `no-multiple-empty-lines`                   | Disallows multiple empty lines                                                           |
| `no-partially-commented-tag-lines`          | Disallows partially commented tag lines                                                  |
| [`no-restricted-tags`](#no-restricted-tags) | Disallow use of particular @tags                                                         |
| `no-scenario-outlines-without-examples`     | Disallows scenario outlines without examples                                             |
| `no-superfluous-tags`                       | Disallows tags present on a Feature and a Scenario in that Feature                       |
| `no-trailing-spaces`                        | Disallows trailing spaces                                                                |
| `no-unnamed-features`                       | Disallows empty Feature name                                                             |
| `no-unnamed-scenarios`                      | Disallows empty Scenario name                                                            |
| `no-unused-variables`                       | Disallows unused variables in scenario outlines                                          |
| `one-space-between-tags`                    | Tags on the same time must be separated by a single space                                |
| `use-and`                                   | Disallows repeated step names requiring use of And instead                               |

\* These rules cannot be turned off because they detect undocumented cucumber functionality that causes the [gherkin](https://github.com/cucumber/gherkin-javascript) parser to crash.

## Rule Configuration
The not-configurable rules are turned on by default and cannot be turned off. Configurable rules can be customized using a [file](#configuration-file).

The configurable rules are off by default. To turn them on, you will need to create a json file, where you specify the name of each rule and its desired state (which can be "on" or "off"). Eg:
```
{
  "no-unnamed-features": "on"
}
```
will turn on the `no-unnamed-features` rule.

### `indentation`

`indentation` can be configured in a more granular level and uses following rules by default:
- Expected indentation for Feature, Background, Scenario, Examples heading: 0 spaces
- Expected indentation for Steps and each example: 2 spaces

You can override the defaults for `indentation` like this:
```
{
  "indentation" : [
    "on", {
      "Feature": 0,
      "Background": 0,
      "Scenario": 0,
      "Step": 2,
      "Examples": 0,
      "example": 2,
      "given": 2,
      "when": 2,
      "then": 2,
      "and": 2,
      "but": 2,
      "feature tag": 0,
      "scenario tag": 0
    }
  ]
}
There is no need to override all the defaults, as is done above, instead they can be overriden only where required.  `Step` will be used as a fallback if the keyword of the step, eg. 'given', is not specified.  If `feature tag` is not set then `Feature` is used as a fallback, and if `scenario tag` is not set then `Scenario` is used as a fallback.

This feature is able to handle all localizations of the gherkin steps.
```

### `name-length`

`name-length` can be configured separately for Feature, Scenario and Step names.
The default is 70 characters for each of these:

```
{
  "name-length" : ["on", { "Feature": 70, "Scenario": 70, "Step": 70 }]
}
```

### `new-line-at-eof`

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

### `no-restricted-tags`

`no-restricted-tags` must be configured with list of tags for it to have any effect:

```
{
  "no-restricted-tags": ["on", {"tags": ["@watch", "@wip", "@todo"]}]
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


## Custom rules
You can specify one more more custom rules directories by using the `-r` or `--rulesdir` command line option. Rules in the given directories will be available additionally to the default rules.

Example:
```
gherkin-lint --rulesdir "/path/to/my/rulesdir" --rulesdir "from/cwd/rulesdir"
```

Paths can either be absolute or relative to the current working directory.
Have a look at the `src/rules/` directory for examples; The `no-empty-file` rule is a good example to start with.

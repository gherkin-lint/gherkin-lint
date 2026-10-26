# Gherkin lint

An unofficial [fork](https://github.com/ohlori/gherkin-lint) of [gherkin-lint](https://github.com/gherkin-lint/gherkin-lint), published as [`@ohlori/gherkin-lint`](https://www.npmjs.com/package/@ohlori/gherkin-lint), based on upstream version `4.2.4`. Current fork version: **4.3.3**. It is not affiliated with or endorsed by the original authors.

## Changes

- Adds support for modern Gherkin `Rule` blocks, including Rule-scoped `Background`s. Rules that previously saw only top-level children now walk Feature-level and Rule-level nodes alike: `allowed-tags`, `no-dupe-scenario-names`, `no-duplicate-tags`, `no-restricted-tags`, `no-unnamed-scenarios`, `one-space-between-tags`, and `use-and`.
- Scopes `no-dupe-scenario-names` by `Rule`. The same scenario name under two different Rules is allowed; duplicates under the same Rule, or both at Feature level, are still reported.
- Fixes `no-trailing-spaces` to allow indentation-only blank lines inside DocStrings, so block indentation is no longer flagged as trailing whitespace.
- Migrates the parser from the deprecated `gherkin` package to `@cucumber/gherkin` 39, and runs the CLI and the stylish formatter straight from `src/` instead of a Babel-built `dist/`.
- Updates `glob` and `lodash` to patch production dependency vulnerabilities.

### `no-dupe-scenario-names` + Rules example

```gherkin
Rule: Users Tab
  Scenario: [Pagination] Next page
    Then users on the next page are shown

Rule: Companies Tab
  Scenario: [Pagination] Next page
    Then companies on the next page are shown
```

Those two scenarios share a name but live under different Rules, so the rule does not report a duplicate.

Configure per-feature duplicate checks like this:

```json
{
  "no-dupe-scenario-names": ["on", "in-feature"]
}
```

## Install

```sh
npm install @ohlori/gherkin-lint
```

See the [original README](https://github.com/gherkin-lint/gherkin-lint#readme) for CLI usage, the `.gherkin-lintrc` format, and the full set of 31 rules.

License: [ISC](https://github.com/ohlori/gherkin-lint/blob/master/LICENSE)

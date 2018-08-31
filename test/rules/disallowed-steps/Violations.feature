Feature: Feature with disallowed steps

Background:
  Given disallowed background step

Scenario: Disallowed exact and partial matching
  Given disallowed scenario step
  When an exact step to not allow
  Then allowed step

Scenario Outline:
  Given disallowed scenario outline step
  When an exact step to not allow
  Then allowed step "<example>"

  Examples:
  | example |
  | one     |
  | two     |

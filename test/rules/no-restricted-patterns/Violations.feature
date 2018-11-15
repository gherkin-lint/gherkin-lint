Feature: Feature with disallowed patterns
  Bad feature text
  A restricted global pattern

Background:
  Given disallowed background step
  And a restricted global pattern

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

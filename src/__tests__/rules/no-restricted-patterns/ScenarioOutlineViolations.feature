Feature: No restricted patterns
  No restricted patterns

Scenario Outline: Disallowed exact and partial matching
A bad description
  Given disallowed scenario outline step
  And a restricted global pattern
  Then allowed step "<example>"

  Examples:
  | example |
  | one     |
  | two     |

Feature: No restricted patterns
  No restricted patterns

Scenario: Disallowed exact and partial matching
A bad description
  Given disallowed scenario step
  And a restricted global pattern
  Then allowed step

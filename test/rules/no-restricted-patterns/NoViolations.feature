Feature: No restricted patterns
  No restricted patterns

Background:
  Given only allowed patterns are used

Scenario: Allowed steps only
  Given I use one allowed step
  When another allowed step is used
  Then no errors should be reported

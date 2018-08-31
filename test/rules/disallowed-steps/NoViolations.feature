Feature: No disallowed steps
  Disallowed words or matches in features are not flagged as errors

Background:
  Given only allowed steps are used

Scenario: Allowed steps only
  Given I use one allowed step
  When another allowed step is used
  Then no errors should be reported

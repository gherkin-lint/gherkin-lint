Feature: Test for no-scenario-outlines-without-examples rule

Scenario Outline: Scenario Outline with empty examples
  Given we use foo
  And the scenario outline has empty examples
  Then I should see a no-scenario-outlines-without-examples error
Examples:

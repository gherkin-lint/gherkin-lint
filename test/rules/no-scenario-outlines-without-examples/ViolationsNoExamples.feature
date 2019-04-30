Feature: Test for no-scenario-outlines-without-examples rule

Scenario Outline: Scenario Outline without examples
  Given we use foo
  And the scenario outline has no examples
  Then I should see a no-scenario-outlines-without-examples error

Feature: Test for no-scenario-outlines-without-examples rule

Scenario Outline: Scenario Outline with an examples header but no body
  Given we use foo
  And the scenario outline has an examples header but no body
  Then I should see a no-scenario-outlines-without-examples error
Examples:
	|foo| bar|

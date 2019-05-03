Feature: Test for no-scenario-outlines-without-examples rule

Scenario Outline: Scenario Outline with examples
  Given we use foo
  And the scenario outline has examples
  Then I should not see a no-scenario-outlines-without-examples error
Examples:
	|foo | bar|
	|1 	 | 2  |

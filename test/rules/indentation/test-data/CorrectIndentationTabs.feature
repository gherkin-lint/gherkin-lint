Feature: Test for correct indentation - tabs

Background:
		Given I have a Feature file with great indentation

Scenario: This is a Scenario with correct indentation - tabs
		Then I should not see an indentation error

Scenario Outline: This is a Scenario Outline with correct indentation - tabs
		Then I should not see an indentation error
Examples:
		| foo |
		| bar |

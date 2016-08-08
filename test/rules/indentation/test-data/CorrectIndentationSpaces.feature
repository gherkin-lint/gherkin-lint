Feature: Test for indentation - spaces

Background:
  Given I have a Feature file with great indentation

Scenario: This is a Scenario with correct indentation - spaces
  Then I should not see an indentation error

Scenario Outline: This is a Scenario Outline with correct indentation - spaces
  Then I should not see an indentation error
Examples:
  | foo |
  | bar |

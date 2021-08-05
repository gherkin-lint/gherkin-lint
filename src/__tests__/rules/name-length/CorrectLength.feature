Feature: Test for length - less than 70 characters

Background:
  Given I have a Feature file with great lengths

Scenario: This is a Scenario with correct length
  Then I should not see a length error

Scenario Outline: This is a Scenario Outline with correct length
  Then I should not see a length error <foo>
Examples:
  | foo |
  | bar |

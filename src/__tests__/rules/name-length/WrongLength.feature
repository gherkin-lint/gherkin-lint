Feature: Test for length - more than 70 characters more than 70 characters more than 70 characters

Background:
  Given I have a Feature file with incorrect lengths - more than 70 characters more than 70 characters

Scenario: This is a Scenario with incorrect length - more than 70 characters more than 70 characters
  Then I should see a length error - more than 70 characters more than 70 characters more than 70 characters

Scenario Outline: This is a Scenario Outline with incorrect length - more than 70 characters more than 70 characters
  Then I should see a length error - more than 70 characters more than 70 characters more than 70 characters  <foo>
Examples:
  | foo |
  | bar |

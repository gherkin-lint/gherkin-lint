 Feature: Test for indentation - spaces

    Background:
Given I have a Feature file with indentation all over the place

 Scenario: This is a Scenario for indentation - spaces
   Then I should see an indentation error

   Scenario Outline: This is a Scenario Outline for indentation - spaces
   Then I should see an indentation error
Examples:
    | foo |
    | bar |

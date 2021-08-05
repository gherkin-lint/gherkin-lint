 @featureTag1 @featureTag2
 Feature: Test for indentation - spaces

    Background:
Given I have a Feature file with indentation all over the place

 @scenarioTag1 @scenarioTag2
 @scenarioTag3
 Scenario: This is a Scenario for indentation - spaces
   Then I should see an indentation error

   @scenarioTag1 @scenarioTag2
    @scenarioTag3
   Scenario Outline: This is a Scenario Outline for indentation - spaces
   Then I should see an indentation error <foo>
  Examples:
    | foo |
    | bar |

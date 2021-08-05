@featuretag @featuretag1 @anothertag
Feature: Feature with multiple duplicate tags

Background:

@scenariotag @scenariotag1 @scenariotag2 @anothertag
Scenario: This is a Scenario with three duplicate tags
  Then this is a then step

@scenariotag @scenariotag1
Scenario Outline: This is a Scenario Outline with two duplicate tags
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

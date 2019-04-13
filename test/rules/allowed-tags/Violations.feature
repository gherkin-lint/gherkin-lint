@featuretag @featuretag1 @anothertag
Feature: Feature with multiple duplicate tags

Background:
  Given I have a Background

@scenariotag @scenariotag1 @scenariotag2 @anothertag
Scenario: This is a Scenario with three duplicate tags
  Then this is a then step

@scenariotag @scenariotag1
Scenario Outline: This is a Scenario Outline with two duplicate tags
  Then this is a then step <foo>
@exampletag1
Examples:
  | foo |
@exampletag2
Examples:
  | bar |

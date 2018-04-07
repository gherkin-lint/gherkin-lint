@featuretag @featuretag @anothertag
Feature: Feature with multiple duplicate tags

Background:
  Given I have a Background

@scenariotag @scenariotag @scenariotag @anothertag
Scenario: This is a Scenario with three duplicate tags
  Then this is a then step

@scenariotag @scenariotag
Scenario Outline: This is a Scenario Outline with two duplicate tags
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

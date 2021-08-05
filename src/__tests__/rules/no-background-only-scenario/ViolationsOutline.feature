@featuretag @featuretag1 @anothertag
Feature: Feature with multiple duplicate tags

Background:
  Given I have a Background

@scenariotag @scenariotag1
Scenario Outline: This is a Scenario Outline with two duplicate tags
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

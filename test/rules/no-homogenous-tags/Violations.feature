Feature: Feature with homogenous tags

Background:
  Given I have a Background

@tag1 @tag2 @tag3
Scenario: This is a Scenario with some tags
  Then this is a then step

@tag1 @tag2 @tag4
Scenario Outline: This is a Scenario Outline with the same tags
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |

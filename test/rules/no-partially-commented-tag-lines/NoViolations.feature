# @featuretag1 @featuretag2
Feature: Feature with multiple tags

Background:
  Given I have a Background

#@tag1 @tag2 @featuretag1
Scenario: This is a Scenario with multiple tags
  Then this is a then step

@tag3 @tag4
Scenario Outline: This is a Scenario Outline with multiple tags
  Then this is a then step <foo>
@tag5 @tag6
  # @tag7
Examples:
  | foo |
  | bar |
#@tag8 # my comment
Examples:
  | fizz |
  | buzz |

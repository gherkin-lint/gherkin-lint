Feature: Feature with description

Background:
  Given I have a Background

Scenario: Given Given
  Given text1
  When text2
  Then text3
  Given text1
  When text2
  Then text3

Scenario Outline: This is a Scenario Outline
  When text1
  Then text2
  And text3
  And text4
Examples:
  | foo |
  | bar |
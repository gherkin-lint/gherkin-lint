Feature: Feature with description

Background:
  Given I have a Background

Scenario: Given Given
  Given text1
  And text2
  Given text3
  When text4
  Then text5

Scenario Outline: This is a Scenario Outline
  When text1
  Then text2
  Then text3
  And text4
Examples:
  | foo |
  | bar |

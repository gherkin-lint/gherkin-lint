@tag #this is a comment
Feature: Test for the no-partially-commented-tag-lines

Background:
  Given I have a Feature file

@tag #@commented-out-tag
Scenario: This is a Scenario
  Then this is a step


@tag #@commented-out-tag
Scenario Outline: This is a Scenario Outline
  Then this is a step
  @tag#@commented-out-tag
  Examples:
  	|foo|
  	|bar|

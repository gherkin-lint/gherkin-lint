Feature: Multiline step in background

  @tag
  Background:
    Given this is a background with a tag


  Scenario Outline: This is a multiline
  scenario outline step scenario

    Given this step is not mutiline <foo>
    And this step
  is multiline

    Examples:
      | foo |
      | 1   |

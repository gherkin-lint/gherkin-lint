Feature: Example Feature

Background: Background name
  Given I have a Background
  And I need more steps
  And because I am testing secenario-size
  And as many steps I get
  When better

Scenario: This is a Scenario name
  Then this is a then step
  But I need more
  And because I am testing secenario-size
  And as many steps I get
  When better

Scenario Outline: This is a Scenario name
  Then this is a then step <foo>
  But I need more
  And because I am testing secenario-size
  And as many steps I get
  When better
Examples:
  | foo |
  | bar |

Feature: Test for the new-line-at-eof rule without new line

Scenario: This is a Scenario for new-line-at-eof
  Given I don't have a new line at the end of this file
  Then the linter should raise/not raise an error based on how it's configured
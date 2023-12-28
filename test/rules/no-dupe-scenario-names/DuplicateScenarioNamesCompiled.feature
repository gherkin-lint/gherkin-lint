Feature: This is a Feature with non unique scenario names in pickles

Background:
  Given I have a Background

Scenario: This is a non unique name
  Then this is a then step

Scenario Outline: This is a <type> name
  Then this is a then step <type>
Examples:
  | type       |
  | unique     |
  | non unique |

Scenario Outline: This is a non unique name in example <foo>
  Then this is a then step <foo>
Examples:
  | foo |
  | bar |
  | bar |

Scenario Outline: This is a non unique name across examples <foo>
  Then this is a then step <foo>
Examples:
  | foo    |
  | asd    |
  | bar    |
Examples:
  | foo    |
  | qwe    |
  | bar    |
Examples:
  | foo    |
  | bar    |


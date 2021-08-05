Feature: Feature with no use-and violations

Background:
  Given step4
  Given step5
  And step6
  When step7
  When step8
  And step9
  Then step10
  Then step11
  And step12

Scenario: This is a Scenario
  Given step15
  Given step16
  And step17
  When step18
  When step19
  And step20
  Then step21
  Then step22
  And step23

Scenario Outline: This is a Scenario Outline
  Given step26
  Given step27
  And step28
  When step29
  When step30
  And step31
  Then step32
  Then step33
  And step34
Examples:
  | foo |
  | bar |

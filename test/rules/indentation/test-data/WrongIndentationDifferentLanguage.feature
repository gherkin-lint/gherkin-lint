#language: de
    Funktionalität: Test for indentation - with German language and spaces

    Grundlage:
Angenommen I have a Feature file with indentation all over the place

    Szenario: This is a Scenario for indentation - German + spaces
            Dann I should see an indentation error

            Szenariogrundriss: This is a Scenario Outline for indentation - German + spaces
           Dann I should see an indentation error
       Beispiele:
               | foo |
               | bar |

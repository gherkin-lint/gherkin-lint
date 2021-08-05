#language: de
				@featureTag1 @featureTag2
    Funktionalität: Test for indentation - with German language and spaces

    Grundlage:
Angenommen I have a Feature file with indentation all over the place

    @scenarioTag1 @scenarioTag2
 @scenarioTag3
    Szenario: This is a Scenario for indentation - German + spaces
            Dann I should see an indentation error

    @scenarioTag1 @scenarioTag2
 @scenarioTag3
            Szenariogrundriss: This is a Scenario Outline for indentation - German + spaces
           Dann I should see an indentation error <foo>
       Beispiele:
               | foo |
               | bar |

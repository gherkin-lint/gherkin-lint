<a name="module_rules/indentation"></a>

## rules/indentation

* [rules/indentation](#module_rules/indentation)
    * [~name](#module_rules/indentation..name) : <code>string</code>
    * [~availableConfigs](#module_rules/indentation..availableConfigs) : <code>Object</code>
    * [~run(feature, unused, configuration)](#module_rules/indentation..run) ⇒ <code>Array</code>

<a name="module_rules/indentation..name"></a>

### rules/indentation~name : <code>string</code>
The name of the rule

**Kind**: inner property of [<code>rules/indentation</code>](#module_rules/indentation)  
<a name="module_rules/indentation..availableConfigs"></a>

### rules/indentation~availableConfigs : <code>Object</code>
The indentation rule can be configured for each gherkin kewyword and uses following values by default:
<br>- Expected indentation for Feature, Background, Scenario, Examples heading: 0 spaces
<br>- Expected indentation for Steps and each example: 2 spaces
<br>The user provided configuration will be merged with the defaults. That means that you only need to specify only the 
keywords for which you want to override the default indentantion config.
<br>Additionally:  
<br>- `Step` will be used as a fallback if the keyword of the step, eg. 'given', is not specified.  
<br>- If `feature tag` is not set then `Feature` is used as a fallback
<br>- If `scenario tag` is not set then `Scenario` is used as a fallback.

<br>This rule works in all locales.

**Kind**: inner property of [<code>rules/indentation</code>](#module_rules/indentation)  
**Example** *(The rule configuration should look like this (only specify the keywords for which you want to override the defaults))*  
```js
{
  "indentation" : [
    "on", {
      "Feature": 0,
      "Background": 0,
      "Scenario": 0,
      "Step": 2,
      "Examples": 0,
      "example": 2,
      "given": 2,
      "when": 2,
      "then": 2,
      "and": 2,
      "but": 2,
      "feature tag": 0,
      "scenario tag": 0
    }
  ]
}
```
<a name="module_rules/indentation..run"></a>

### rules/indentation~run(feature, unused, configuration) ⇒ <code>Array</code>
Runs the rule's logic against the provide feature file/object

**Kind**: inner method of [<code>rules/indentation</code>](#module_rules/indentation)  
**Returns**: <code>Array</code> - - The detected errors  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>Gerkin.Feature</code> | A Gerkin.Feature object |
| unused |  | Unused parameter, exists to conform to the rule run method signature |
| configuration | <code>Object</code> | The rule configuration whose format should match `availableConfigs` |


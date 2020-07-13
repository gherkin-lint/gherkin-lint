<a name="module_rules/max-scenarios-per-file"></a>

## rules/max-scenarios-per-file

* [rules/max-scenarios-per-file](#module_rules/max-scenarios-per-file)
    * [~name](#module_rules/max-scenarios-per-file..name) : <code>string</code>
    * [~availableConfigs](#module_rules/max-scenarios-per-file..availableConfigs) : <code>Object</code>
    * [~run(feature, unused, configuration)](#module_rules/max-scenarios-per-file..run) ⇒ <code>Array</code>

<a name="module_rules/max-scenarios-per-file..name"></a>

### rules/max-scenarios-per-file~name : <code>string</code>
The name of the rule

**Kind**: inner property of [<code>rules/max-scenarios-per-file</code>](#module_rules/max-scenarios-per-file)  
<a name="module_rules/max-scenarios-per-file..availableConfigs"></a>

### rules/max-scenarios-per-file~availableConfigs : <code>Object</code>
The max-scenarios-per-file rule supports the following configuration options:
<br>- maxScenarios {int} - the maximum scenarios per file after which the rule fails. Defaults to `10`.
<br>- countOutlineExamples {boolean} - whether to count every example row for a Scenario Outline, 
as opposed to just 1 for the whole block. Defaults to `true`.

**Kind**: inner property of [<code>rules/max-scenarios-per-file</code>](#module_rules/max-scenarios-per-file)  
**Example** *(The rule configuration should look like this)*  
```js
{
  "max-scenarios-per-file": ["on", {"maxScenarios": 10, "countOutlineExamples": true}]
}
```
<a name="module_rules/max-scenarios-per-file..run"></a>

### rules/max-scenarios-per-file~run(feature, unused, configuration) ⇒ <code>Array</code>
Runs the rule's logic against the provide feature file/object

**Kind**: inner method of [<code>rules/max-scenarios-per-file</code>](#module_rules/max-scenarios-per-file)  
**Returns**: <code>Array</code> - - The detected errors  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>Gerkin.Feature</code> | A Gerkin.Feature object |
| unused |  | Unused parameter, exists to conform to the rule run method signature |
| configuration | <code>Object</code> | The rule configuration whose format should match `availableConfigs` |


<a name="module_rules/scenario-size"></a>

## rules/scenario-size

* [rules/scenario-size](#module_rules/scenario-size)
    * [~name](#module_rules/scenario-size..name) : <code>string</code>
    * [~availableConfigs](#module_rules/scenario-size..availableConfigs)
    * [~run(feature, unused, configuration)](#module_rules/scenario-size..run) ⇒ <code>Array</code>

<a name="module_rules/scenario-size..name"></a>

### rules/scenario-size~name : <code>string</code>
The name of the rule

**Kind**: inner property of [<code>rules/scenario-size</code>](#module_rules/scenario-size)  
<a name="module_rules/scenario-size..availableConfigs"></a>

### rules/scenario-size~availableConfigs
The rule scenario-size lets you specify the maximum number of steps for scenarios and backgrounds.<br>
The `Scenario` configuration applies to both scenarios and scenario outlines.

**Kind**: inner constant of [<code>rules/scenario-size</code>](#module_rules/scenario-size)  
**Example**  
```js
<caption>The rule configuration should look like this</configuration>
{
  "scenario-size": ["on", { "steps-length": { "Background": 15, "Scenario": 15 }}]
}
```
<a name="module_rules/scenario-size..run"></a>

### rules/scenario-size~run(feature, unused, configuration) ⇒ <code>Array</code>
Runs the rule's logic against the provide feature file/object

**Kind**: inner method of [<code>rules/scenario-size</code>](#module_rules/scenario-size)  
**Returns**: <code>Array</code> - - The detected errors  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>Gerkin.Feature</code> | A Gerkin.Feature object |
| unused |  | Unused parameter, exists to conform to the rule run method signature |
| configuration | <code>Object</code> | The rule configuration whose format should match `availableConfigs` |


<a name="module_rules/name-length"></a>

## rules/name-length

* [rules/name-length](#module_rules/name-length)
    * [~name](#module_rules/name-length..name) : <code>string</code>
    * [~availableConfigs](#module_rules/name-length..availableConfigs) : <code>Object</code>
    * [~run(feature, unused, configuration)](#module_rules/name-length..run) ⇒ <code>Array</code>

<a name="module_rules/name-length..name"></a>

### rules/name-length~name : <code>string</code>
The name of the rule

**Kind**: inner property of [<code>rules/name-length</code>](#module_rules/name-length)  
<a name="module_rules/name-length..availableConfigs"></a>

### rules/name-length~availableConfigs : <code>Object</code>
The name-lentgth rule allows you to configure the maximum length for:
<br> - Feature name
<br> - Scenario name
<br> - Step text
By default the maximum length is set to 70 characters.

**Kind**: inner property of [<code>rules/name-length</code>](#module_rules/name-length)  
**Example** *(The rule configuration should look like this (only specify the keywords for which you want to override the defaults))*  
```js
{
  "name-length" : ["on", { "Feature": 70, "Scenario": 70, "Step": 70 }]
}
```
<a name="module_rules/name-length..run"></a>

### rules/name-length~run(feature, unused, configuration) ⇒ <code>Array</code>
Runs the rule's logic against the provide feature file/object

**Kind**: inner method of [<code>rules/name-length</code>](#module_rules/name-length)  
**Returns**: <code>Array</code> - - The detected errors  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>Gerkin.Feature</code> | A Gerkin.Feature object |
| unused |  | Unused parameter, exists to conform to the rule run method signature |
| configuration | <code>Object</code> | The rule configuration whose format should match `availableConfigs` |


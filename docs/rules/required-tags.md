<a name="module_rules/required-tags"></a>

## rules/required-tags

* [rules/required-tags](#module_rules/required-tags)
    * [~name](#module_rules/required-tags..name) : <code>string</code>
    * [~availableConfigs](#module_rules/required-tags..availableConfigs)
    * [~run(feature, unused, configuration)](#module_rules/required-tags..run) ⇒ <code>Array</code>

<a name="module_rules/required-tags..name"></a>

### rules/required-tags~name : <code>string</code>
The name of the rule

**Kind**: inner property of [<code>rules/required-tags</code>](#module_rules/required-tags)  
<a name="module_rules/required-tags..availableConfigs"></a>

### rules/required-tags~availableConfigs
The required-tags rule should be configured with the list of required tags.

**Kind**: inner constant of [<code>rules/required-tags</code>](#module_rules/required-tags)  
**Example**  
```js
<caption>The rule configuration should look like this</configuration>
{
  "required-tags": ["on", {"tags": ["@requiredTag1", "@requiredTag2"]}]
}
```
<a name="module_rules/required-tags..run"></a>

### rules/required-tags~run(feature, unused, configuration) ⇒ <code>Array</code>
Require tags/patterns of tags on Scenarios

**Kind**: inner method of [<code>rules/required-tags</code>](#module_rules/required-tags)  
**Returns**: <code>Array</code> - - The detected errors  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>Gerkin.Feature</code> | A Gerkin.Feature object |
| unused |  | Unused parameter, exists to conform to the rule run method signature |
| configuration | <code>Object</code> | The rule configuration whose format should match `availableConfigs` |


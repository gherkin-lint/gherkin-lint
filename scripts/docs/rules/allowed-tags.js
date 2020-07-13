<a name="module_rules/allowed-tags"></a>

## rules/allowed-tags

* [rules/allowed-tags](#module_rules/allowed-tags)
    * [~name](#module_rules/allowed-tags..name) : <code>string</code>
    * [~availableConfigs](#module_rules/allowed-tags..availableConfigs) : <code>Object</code>
    * [~run(feature, unused, configuration)](#module_rules/allowed-tags..run) ⇒ <code>Array</code>

<a name="module_rules/allowed-tags..name"></a>

### rules/allowed-tags~name : <code>string</code>
The name of the rule

**Kind**: inner property of [<code>rules/allowed-tags</code>](#module_rules/allowed-tags)  
<a name="module_rules/allowed-tags..availableConfigs"></a>

### rules/allowed-tags~availableConfigs : <code>Object</code>
The allowed-tags rule should be configured with a list of the allowed tags, in order to have an effect.

**Kind**: inner property of [<code>rules/allowed-tags</code>](#module_rules/allowed-tags)  
**Example** *(The rule configuration should look like this)*  
```js
{
  "allowed-tags": ["on", {"tags": ["@watch", "@wip", "@todo"]}]
}
```
<a name="module_rules/allowed-tags..run"></a>

### rules/allowed-tags~run(feature, unused, configuration) ⇒ <code>Array</code>
Runs the rule's logic against the provide feature file/object

**Kind**: inner method of [<code>rules/allowed-tags</code>](#module_rules/allowed-tags)  
**Returns**: <code>Array</code> - - The detected errors  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>Gerkin.Feature</code> | A Gerkin.Feature object |
| unused |  | Unused parameter, exists to conform to the rule run method signature |
| configuration | <code>Object</code> | The rule configuration whose format should match `availableConfigs` |


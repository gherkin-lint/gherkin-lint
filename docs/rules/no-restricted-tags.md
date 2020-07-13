<a name="module_rules/no-restricted-tags"></a>

## rules/no-restricted-tags

* [rules/no-restricted-tags](#module_rules/no-restricted-tags)
    * [~name](#module_rules/no-restricted-tags..name) : <code>string</code>
    * [~availableConfigs](#module_rules/no-restricted-tags..availableConfigs)
    * [~run(feature, unused, configuration)](#module_rules/no-restricted-tags..run) ⇒ <code>Array</code>

<a name="module_rules/no-restricted-tags..name"></a>

### rules/no-restricted-tags~name : <code>string</code>
The name of the rule

**Kind**: inner property of [<code>rules/no-restricted-tags</code>](#module_rules/no-restricted-tags)  
<a name="module_rules/no-restricted-tags..availableConfigs"></a>

### rules/no-restricted-tags~availableConfigs
The no-restricted-tags rule should be configured with the list of restricted tags.

**Kind**: inner constant of [<code>rules/no-restricted-tags</code>](#module_rules/no-restricted-tags)  
**Example**  
```js
<caption>The rule configuration should look like this</configuration>
{
  "no-restricted-tags": ["on", {"tags": ["@watch", "@wip", "@todo"]}]
}
```
<a name="module_rules/no-restricted-tags..run"></a>

### rules/no-restricted-tags~run(feature, unused, configuration) ⇒ <code>Array</code>
Runs the rule's logic against the provide feature file/object

**Kind**: inner method of [<code>rules/no-restricted-tags</code>](#module_rules/no-restricted-tags)  
**Returns**: <code>Array</code> - - The detected errors  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>Gerkin.Feature</code> | A Gerkin.Feature object |
| unused |  | Unused parameter, exists to conform to the rule run method signature |
| configuration | <code>Object</code> | The rule configuration whose format should match `availableConfigs` |


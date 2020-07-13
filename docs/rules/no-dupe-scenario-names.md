<a name="module_rules/no-dupe-scenario-names"></a>

## rules/no-dupe-scenario-names

* [rules/no-dupe-scenario-names](#module_rules/no-dupe-scenario-names)
    * [~name](#module_rules/no-dupe-scenario-names..name) : <code>string</code>
    * [~availableConfigs](#module_rules/no-dupe-scenario-names..availableConfigs) : <code>Array</code>
    * [~run(feature, file, [configuration])](#module_rules/no-dupe-scenario-names..run) ⇒ <code>Array</code>

<a name="module_rules/no-dupe-scenario-names..name"></a>

### rules/no-dupe-scenario-names~name : <code>string</code>
The name of the rule

**Kind**: inner property of [<code>rules/no-dupe-scenario-names</code>](#module_rules/no-dupe-scenario-names)  
<a name="module_rules/no-dupe-scenario-names..availableConfigs"></a>

### rules/no-dupe-scenario-names~availableConfigs : <code>Array</code>
The no-dupe-scenario-names rule can can be configured to search for duplicates in each individual feature or amongst all feature files.
By default the rule will search for duplicates in all features.

**Kind**: inner property of [<code>rules/no-dupe-scenario-names</code>](#module_rules/no-dupe-scenario-names)  
**Example** *(Search for duplicates in all features (using the default configuration))*  
```js
{
  "no-dupe-scenario-names": "on"
}
```
**Example** *(Search for duplicates in all features (using explicit configuration))*  
```js
{
  "no-dupe-scenario-names": ["on", "anywhere"]
}
```
**Example** *(Search for duplicates in each individual feature (same scenario name in different features won&#x27;t raise an error))*  
```js
{
  "no-dupe-scenario-names": ["on", "in-feature"]
}
```
<a name="module_rules/no-dupe-scenario-names..run"></a>

### rules/no-dupe-scenario-names~run(feature, file, [configuration]) ⇒ <code>Array</code>
Runs the rule's logic against the provide feature file/object

**Kind**: inner method of [<code>rules/no-dupe-scenario-names</code>](#module_rules/no-dupe-scenario-names)  
**Returns**: <code>Array</code> - - The detected errors  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>Gerkin.Feature</code> | A Gerkin.Feature object |
| file | <code>Object</code> | An Object containing the lines and relative path of the feature file |
| [configuration] | <code>String</code> | The rule configuration which can be empty or it needs to match one of the availableConfigs |


<a name="module_rules/no-dupe-feature-names"></a>

## rules/no-dupe-feature-names

* [rules/no-dupe-feature-names](#module_rules/no-dupe-feature-names)
    * [~name](#module_rules/no-dupe-feature-names..name) : <code>string</code>
    * [~run(feature, file)](#module_rules/no-dupe-feature-names..run) ⇒ <code>Array</code>

<a name="module_rules/no-dupe-feature-names..name"></a>

### rules/no-dupe-feature-names~name : <code>string</code>
The name of the rule

**Kind**: inner property of [<code>rules/no-dupe-feature-names</code>](#module_rules/no-dupe-feature-names)  
<a name="module_rules/no-dupe-feature-names..run"></a>

### rules/no-dupe-feature-names~run(feature, file) ⇒ <code>Array</code>
Runs the rule's logic against the provide feature file/object

**Kind**: inner method of [<code>rules/no-dupe-feature-names</code>](#module_rules/no-dupe-feature-names)  
**Returns**: <code>Array</code> - - The detected errors  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>Gerkin.Feature</code> | A Gerkin.Feature object |
| file | <code>Object</code> | An Object containing the lines and relative path of the feature file |


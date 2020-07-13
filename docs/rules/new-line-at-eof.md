<a name="module_rules/new-line-at-eof"></a>

## rules/new-line-at-eof

* [rules/new-line-at-eof](#module_rules/new-line-at-eof)
    * [~name](#module_rules/new-line-at-eof..name) : <code>string</code>
    * [~availableConfigs](#module_rules/new-line-at-eof..availableConfigs) : <code>Array</code>
    * [~run(unused, file, configuration)](#module_rules/new-line-at-eof..run) ⇒ <code>Array</code>

<a name="module_rules/new-line-at-eof..name"></a>

### rules/new-line-at-eof~name : <code>string</code>
The name of the rule

**Kind**: inner property of [<code>rules/new-line-at-eof</code>](#module_rules/new-line-at-eof)  
<a name="module_rules/new-line-at-eof..availableConfigs"></a>

### rules/new-line-at-eof~availableConfigs : <code>Array</code>
The new-line-at-eof rule can be configured to enforce or disallow new lines at EOF.

**Kind**: inner property of [<code>rules/new-line-at-eof</code>](#module_rules/new-line-at-eof)  
**Example** *(Enforce new lines at EOF)*  
```js
{
  "new-line-at-eof": ["on", "yes"]
}
```
**Example** *(Disallow new lines at EOF)*  
```js
{
  "new-line-at-eof": ["on", "no"]
}
```
<a name="module_rules/new-line-at-eof..run"></a>

### rules/new-line-at-eof~run(unused, file, configuration) ⇒ <code>Array</code>
Runs the rule's logic against the provide feature file/object

**Kind**: inner method of [<code>rules/new-line-at-eof</code>](#module_rules/new-line-at-eof)  
**Returns**: <code>Array</code> - - The detected errors  

| Param | Type | Description |
| --- | --- | --- |
| unused |  | Unused parameter, exists to conform to the rule run method signature |
| file | <code>Object</code> | An Object containing the lines and relative path of the feature file |
| configuration | <code>Object</code> | The rule configuration whose format should match `availableConfigs` |


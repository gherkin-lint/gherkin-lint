<a name="module_rules/no-restricted-patterns"></a>

## rules/no-restricted-patterns

* [rules/no-restricted-patterns](#module_rules/no-restricted-patterns)
    * [~name](#module_rules/no-restricted-patterns..name) : <code>string</code>
    * [~availableConfigs](#module_rules/no-restricted-patterns..availableConfigs)
    * [~run(feature, unused, configuration)](#module_rules/no-restricted-patterns..run) ⇒ <code>Array</code>

<a name="module_rules/no-restricted-patterns..name"></a>

### rules/no-restricted-patterns~name : <code>string</code>
The name of the rule

**Kind**: inner property of [<code>rules/no-restricted-patterns</code>](#module_rules/no-restricted-patterns)  
<a name="module_rules/no-restricted-patterns..availableConfigs"></a>

### rules/no-restricted-patterns~availableConfigs
The no-restricted-patterns patterns rule can be configured with lists of exact or partial patterns whose matches are dissallowed in:
<br> - feature name and description
<br> - background steps
<br> - scenario and scenario outline name, description and steps
All patterns are treated as case insensitive.

**Kind**: inner constant of [<code>rules/no-restricted-patterns</code>](#module_rules/no-restricted-patterns)  
**Examples**: <caption>The rule configuration should look like this</caption>
{
  "no-restricted-patterns": ["on", {
    "Global": [
      "^globally restricted pattern"
    ],
    "Feature": [
      "poor description",
      "validate",
      "verify"
    ],
    "Background": [
      "show last response",
      "a debugging step"
    ],
    "Scenario": [
      "show last response",
      "a debugging step"
    ]
  }]
}  
<a name="module_rules/no-restricted-patterns..run"></a>

### rules/no-restricted-patterns~run(feature, unused, configuration) ⇒ <code>Array</code>
Runs the rule's logic against the provide feature file/object

**Kind**: inner method of [<code>rules/no-restricted-patterns</code>](#module_rules/no-restricted-patterns)  
**Returns**: <code>Array</code> - - The detected errors  

| Param | Type | Description |
| --- | --- | --- |
| feature | <code>Gerkin.Feature</code> | A Gerkin.Feature object |
| unused |  | Unused parameter, exists to conform to the rule run method signature |
| configuration | <code>Object</code> | The rule configuration whose format should match `availableConfigs` |


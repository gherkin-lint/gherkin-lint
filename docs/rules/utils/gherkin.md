<a name="module_rules/utils/gherkin"></a>

## rules/utils/gherkin
A utility that wraps some of the gherkin package functionality


* [rules/utils/gherkin](#module_rules/utils/gherkin)
    * [~getNodeType(node, language)](#module_rules/utils/gherkin..getNodeType)
    * [~getNodeType(node, language)](#module_rules/utils/gherkin..getNodeType)

<a name="module_rules/utils/gherkin..getNodeType"></a>

### rules/utils/gherkin~getNodeType(node, language)
A function that return a gherkin node's type based on the used keyword because it's the only way to distinguish a scenario with a scenario outline.

**Kind**: inner method of [<code>rules/utils/gherkin</code>](#module_rules/utils/gherkin)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Gherkin.Node</code> | A gherkin node |
| language | <code>string</code> | Language in which the feature file is written |

<a name="module_rules/utils/gherkin..getNodeType"></a>

### rules/utils/gherkin~getNodeType(node, language)
A function that return a gherkin node's language insensitive keyword.

**Kind**: inner method of [<code>rules/utils/gherkin</code>](#module_rules/utils/gherkin)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Gherkin.Node</code> | A gherkin node |
| language | <code>string</code> | Language in which the feature file is written |


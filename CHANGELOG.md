## 0.2.4 (2020-8-29)

### Features

- Highlight the following syntax with JavaScript style in UI5 XML view:
  + Data Binding
  + Expression Binding
  + Member function calls, such as `".foo($event, {/name})"`
  + Special event parameters, such as `$source`, `$event`, etc.

### Known Issues

- The `${b}` in `"{= ${a} ? ${b} : ${c} }"` cannot render correctly.
- `${binding}`s in `()` cannot render correctly.

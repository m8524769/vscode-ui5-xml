## 0.5.0 (2020-9-15)

### Features

- Auto-indent.

## 0.4.1 (2020-9-13)

### Fix Bugs

- Cannot auto-close before whitespace.

## 0.4.0 (2020-9-13)

### Features

- Highlight UI5 controls with JSX component style.

## 0.3.0 (2020-9-5)

### Features

- Add snippets for special event parameters triggered with `$`.

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

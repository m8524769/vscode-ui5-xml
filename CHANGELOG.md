## 0.6.2 (2020-12-20)

### Fix Bugs

- Cannot recognize `[]` in data binding syntax.

## 0.6.1 (2020-10-27)

### Fix Bugs

- Cannot auto-close before `>`.

## 0.6.0 (2020-10-24)

### Features

- Auto-complete the binding information in data binding syntax.
- Auto-complete UI5 built-in CSS classnames.
- Auto-complete SAPUI5 built-in icons. (Partial Support)
- Add snippets for UI5 XML view/fragment template triggered with `"ui5"`.

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

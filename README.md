[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/version/m8524769.ui5-xml-support.svg)](https://marketplace.visualstudio.com/items?itemName=m8524769.ui5-xml-support)
[![installs](https://vsmarketplacebadge.apphb.com/installs-short/m8524769.ui5-xml-support.svg)](https://marketplace.visualstudio.com/items?itemName=m8524769.ui5-xml-support)

# UI5 XML Support

Syntax highlighting & Auto-complete for SAPUI5 XML view.

<img src=https://raw.githubusercontent.com/m8524769/vscode-ui5-xml/master/images/demo.gif width=546>

## Features

- Highlight the following syntax with JavaScript style in UI5 XML view:
  * Data Binding
  * Expression Binding
  * Member function calls, such as `".foo($event, {/name})"`
  * Special event parameters, such as `$source`, `$event`, etc.
- Highlight UI5 controls with JSX component style.
- Auto-complete the binding information in data binding syntax.
- Auto-complete UI5 built-in CSS classnames.
- Auto-complete special event parameters.
- Auto-indent.
- Snippets for UI5 XML view/fragment template triggered with `"ui5"`.

## For Developers

```shell
npm i
```

Then run the VS Code Debugger to preview the functionality.

#### Generate the `.vsix` package

```shell
npm i -g vsce
npm run build:prod
vsce package
```

import {
  languages,
  ExtensionContext,
  IndentAction,
  TextDocument,
  CompletionItem,
  CompletionItemKind,
  SnippetString,
  MarkdownString,
} from 'vscode';

const isUI5XMLView = (fileName: string): boolean => /(\.view\.xml|\.fragment\.xml)$/.test(fileName);

export function activate(context: ExtensionContext) {

  languages.setLanguageConfiguration("xml", {
    // Referenced from: https://github.com/redhat-developer/vscode-xml/blob/master/src/extension.ts#L363-L377
    indentationRules: {
      increaseIndentPattern: /<(?!\?|[^>]*\/>)([-_\.A-Za-z0-9]+)(?=\s|>)\b[^>]*>(?!.*<\/\1>)|<!--(?!.*-->)|\{[^}"']*$/,
      decreaseIndentPattern: /^\s*(<\/[-_\.A-Za-z0-9]+\b[^>]*>|-->|\})/
    },
    onEnterRules: [
      {
        beforeText: new RegExp(`<([_:\\w][_:\\w-.\\d]*)([^/>]*(?!/)>)[^<]*$`, 'i'),
        afterText: /^<\/([_:\w][_:\w-.\d]*)\s*>/i,
        action: { indentAction: IndentAction.IndentOutdent }
      },
      {
        beforeText: new RegExp(`<(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`, 'i'),
        action: { indentAction: IndentAction.Indent }
      }
    ]
  });

  /**
   * See {@link https://sapui5.hana.ondemand.com/#/api/sap.ui.base.ManagedObject%23methods/bindProperty bindProperty},
   * {@link https://sapui5.hana.ondemand.com/#/api/sap.ui.base.ManagedObject%23methods/bindAggregation bindAggregation}
   * and {@link https://sapui5.hana.ondemand.com/#/api/sap.ui.base.ManagedObject%23methods/bindObject bindObject}
   * in {@link https://sapui5.hana.ondemand.com/#/api/sap.ui.base.ManagedObject sap.ui.base.ManagedObject}.
   */
  const dataBindingProvider = languages.registerCompletionItemProvider('xml', {
    provideCompletionItems(document: TextDocument) {
      if (!isUI5XMLView(document.fileName)) {
        return undefined;
      }

      return [
        { label: "path", insertText: "path: '${1}'", type: "string", documentation: "Path in the model to bind to, either an absolute path or relative to the binding context for the corresponding model; when the path contains a '>' sign, the string preceding it will override the `model` property and the remainder after the '>' will be used as binding path" },
        { label: "model", insertText: "model: '${1}'", type: "string", documentation: "Name of the model to bind against; when `undefined` or omitted, the default model is used" },
        { label: "template", insertText: "template: '${1}'", type: "string", documentation: "The template to clone for each item in the aggregation; either a template or a factory must be given" },
        { label: "templateShareable", insertText: "templateShareable: ${1|false,true|}", type: "boolean | undefined", documentation: "Whether the framework should assume that the application takes care of the lifecycle of the given template; when set to `true`, the template can be used in multiple bindings, either in parallel or over time, and the framework won't clone it when this `ManagedObject` is cloned; when set to `false`, the lifecycle of the template is bound to the lifecycle of the binding, when the aggregation is unbound or when this `ManagedObject` is destroyed, the template also will be destroyed, and when this `ManagedObject` is cloned, the template will be cloned as well; the third option (`undefined`) only exists for compatibility reasons, its behavior is not fully reliable and it may leak the template" },
        { label: "factory", insertText: "factory: '${1}'", type: "string", documentation: "A factory function that will be called to create an object for each item in the aggregation; this is an alternative to providing a template object and can be used when the objects should differ depending on the binding context; the factory function will be called with two parameters: an ID that should be used for the created object and the binding context for which the object has to be created; the function must return an object appropriate for the bound aggregation" },
        { label: "suspended", insertText: "suspended: ${1|false,true|}", type: "boolean", documentation: "Whether the binding should be suspended initially" },
        { label: "startIndex", insertText: "startIndex: ${1}", type: "number", documentation: "The first entry of the list to be created" },
        { label: "length", insertText: "length: ${1}", type: "number", documentation: "The amount of entries to be created (may exceed the size limit of the model)" },
        { label: "sorter", insertText: "sorter: {${1}}", type: "object | object[]", documentation: "The initial sort order (optional)" },
        { label: "filters", insertText: "filters: [${1}]", type: "object[]", documentation: "The predefined filters for this aggregation (optional)" },
        { label: "key", insertText: "key: '${1}'", type: "string", documentation: "Name of the key property or a function getting the context as only parameter to calculate a key for entries. This can be used to improve update behaviour in models, where a key is not already available." },
        { label: "formatter", insertText: "formatter: '${1}'", type: "string", documentation: "Function to convert model data into a property value" },
        { label: "useRawValues", insertText: "useRawValues: ${1|false,true|}", type: "boolean", documentation: "Whether the parameters to the formatter function should be passed as raw values. In this case the specified types for the binding parts are not used and the values are not formatted.\n\n**Note**: use this flag only when using multiple bindings. If you use only one binding and want raw values then simply don't specify a type for that binding." },
        { label: "useInternalValues", insertText: "useInternalValues: ${1|false,true|}", type: "boolean", documentation: "Whether the parameters to the formatter function should be passed as the related JavaScript primitive values. In this case the values of the model are parsed by the [model format](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.SimpleType%23methods/getModelFormat) of the specified types from the binding parts.\n\n**Note**: use this flag only when using multiple bindings." },
        { label: "type", insertText: "type: '${1}'", type: "string", documentation: "A type object or the name of a type class to create such a type object; the type will be used for converting model data to a property value (aka \"formatting\") and vice versa (in binding mode `TwoWay`, aka \"parsing\")" },
        { label: "targetType", insertText: "targetType: '${1}'", type: "string", documentation: "Target type to be used by the type when formatting model data, for example \"boolean\" or \"string\" or \"any\"; defaults to the property's type" },
        { label: "formatOptions", insertText: "formatOptions: {${1}}", type: "object", documentation: "Format options to be used for the type; only taken into account when the type is specified by its name - a given type object won't be modified" },
        { label: "constraints", insertText: "constraints: {${1}}", type: "object", documentation: "Additional constraints to be used when constructing a type object from a type name, ignored when a type object is given" },
        { label: "mode", insertText: "mode: '${1|Default,OneTime,OneWay,TwoWay|}'", type: "\"Default\" | \"OneTime\" | \"OneWay\" | \"TwoWay\"", documentation: "Binding mode to be used for this property binding (e.g. one way)" },
        { label: "parameters", insertText: "parameters: {${1}}", type: "object", documentation: "Map of additional parameters for this binding; the names and value ranges of the supported parameters depend on the model implementation, they should be documented with the `bindProperty` method of the corresponding model class or with the model specific subclass of `sap.ui.model.PropertyBinding`" },
        { label: "groupHeaderFactory", insertText: "groupHeaderFactory: '${1}'", type: "string", documentation: "A factory function to generate custom group visualization (optional). It should return a control suitable to visualize a group header (e.g. a `sap.m.GroupHeaderListItem` for a `sap.m.List`)." },
        { label: "events", insertText: "events: {${1}}", type: "object", documentation: "Map of event handler functions keyed by the name of the binding events that they should be attached to" },
        { label: "parts", insertText: "parts: [${1}]", type: "object[]", documentation: "Array of binding info objects for the parts of a composite binding; the structure of each binding info is the same as described for the `oBindingInfo` as a whole.\n\n**Note**: recursive composite bindings are currently not supported" },
      ].map(bindingInfo => {
        const completion = new CompletionItem(bindingInfo.label, CompletionItemKind.Field);
        completion.insertText = new SnippetString(bindingInfo.insertText);
        completion.detail = `(property) ${bindingInfo.label}?: ${bindingInfo.type}`;
        completion.documentation = new MarkdownString(bindingInfo.documentation);
        return completion;
      });
    }
  });

  /**
   * See {@link https://sapui5.hana.ondemand.com/#/topic/b0fb4de7364f4bcbb053a99aa645affe Handling Events in XML Views}.
   */
  const specialParamsProvider = languages.registerCompletionItemProvider('xml', {
    provideCompletionItems(document: TextDocument) {
      if (!isUI5XMLView(document.fileName)) {
        return undefined;
      }

      return [
        { label: "$parameters", type: "sap.ui.model.base.ManagedObjectModel", documentation: "Event parameters model" },
        { label: "$source", type: "sap.ui.model.base.ManagedObjectModel", documentation: "A `ManagedObjectModel` which wraps the control firing the event" },
        { label: "$event", type: "sap.ui.base.Event", documentation: "The original event object" },
        { label: "$controller", type: "sap.ui.core.mvc.Controller", documentation: "The controller context" },
      ].map(parameter => {
        const completion = new CompletionItem(parameter.label, CompletionItemKind.Variable);
        completion.detail = `(parameter) ${parameter.label}: ${parameter.type}`;
        completion.documentation = new MarkdownString(parameter.documentation);
        return completion;
      });
    }
  });

  context.subscriptions.push(dataBindingProvider, specialParamsProvider);
}

export function deactivate() { }

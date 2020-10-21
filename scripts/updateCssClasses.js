const fs = require('fs');
const path = require('path');
const https = require('https');

const source = "https://sapui5.hana.ondemand.com/resources/sap/ui/core/themes/base/library.less";
const output = path.resolve(__dirname, "../src/constants/cssClasses.ts")

https.get(source, res => {
  let data = "";
  res.on("data", chunk => data += chunk);

  res.on("end", () => {
    const classNames = Array.from(new Set(data.match(/\.sap\w+/g)))
      .map(className => `"${className}"`.replace(".", ""))
      .join(",\n  ");

    fs.writeFileSync(
      output,
      "/**\n" +
      ` * See {@link ${source} library.less} in SAPUI5 source code.\n` +
      " */\n" +
      `export const CSS_CLASSES = [\n  ${classNames}\n];`);
  });
});

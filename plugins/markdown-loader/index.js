const hljs = require("highlight.js");
const { getOptions } = require("loader-utils");
const marked = require("marked");
let markedInit = false;

module.exports = function (source) {
  /**options
   * style
   * customPreCss
   */

  if (!markedInit) {
    marked.setOptions({
      render: new marked.Renderer(),
      highlight: function (code, lang) {
        const sourceCompiled = hljs.highlight(code, {
          language: (lang = hljs.getLanguage(lang) ? lang : "plaintext"),
        }).value;
        return `<div class="${
          options.customPreCss || ""
        } ${lang}">${sourceCompiled}</div>`;
      },
    });
  }
  const options = getOptions(this) || {};
  const styleFileName = options.style || "default";

  return `
import yoHljsStyle from "highlight.js/styles/${styleFileName}.css";
yoHljsStyle;
export default \`${marked(source)}\`;
  `;
};

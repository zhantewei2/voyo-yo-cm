const hljs = require("highlight.js");
const qs = require("querystring");
const { getOptions } = require("loader-utils");

module.exports = function (source) {
  /**options
   * style
   * customPreCss
   */
  const options = getOptions(this) || {};
  const query = this.resourceQuery;

  let lang,
    styleName = options.style || "default";
  if (query) {
    const queryParsed = qs.parse(query.slice(1));
    if (queryParsed.lang) lang = queryParsed.lang;
  }
  let sourceCompiled = hljs.highlight(
    source,
    lang ? { language: lang } : {},
  ).value;

  const stylesImport = `
import yoHljsStyle from "highlight.js/styles/${styleName}.css";
yoHljsStyle;
  `;

  sourceCompiled = `
<pre class="${options.customPreCss || ""} ${lang}">${sourceCompiled}</pre>
  `;
  return `
${stylesImport}
const source=\`${sourceCompiled}\`;
export default source`;
};

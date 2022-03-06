const { merge } = require("webpack-merge");
const { BaseConfig, ModuleFederationPlugin, deps } = require("@voyom/core");

const path = require("path");
const join = (...args) => path.join(__dirname, ...args);

module.exports = ({ env, declare }) => {
  return merge(
    BaseConfig({
      sassOptions: {
        sourceMap: false,
        additionalData: "$--voyo-platform: h5;$--voyo-platform-h5: true;",
      },
      tsLoaderConfig: declare?{}:undefined
    }),
    {
      optimization:{
        providedExports :true,
        sideEffects: true,
        innerGraph: true,
        usedExports: true,
        concatenateModules: false,
      },
      plugins: [
        // new (require("webpack-bundle-analyzer").BundleAnalyzerPlugin)(),
      ],
      experiments: {
        outputModule: true,
      },
      mode: "production",
      entry: {
        main: !declare?join("index.ts"):join("index-type.ts"),
      },
      output: {
        library: {
          type: "module",
        },
        path: join("../dist"),
        filename: "[name].js",
        module:true,
      },
      "externalsType": "module",
      externals: {
        rxjs: "rxjs",
        'rxjs/operators':'rxjs/operators',
        vue: "vue",
        "vue-property-decorator": "vue-property-decorator",
        marked: "module marked",
        "element-ui":"element-ui",
        "@ztwx/utils": "@ztwx/utils",
        "@ztwx/utils/lib/url":"@ztwx/utils/lib/url",
        "@ztwx/utils/lib/web":"@ztwx/utils/lib/web"
      },
    },
  );
};

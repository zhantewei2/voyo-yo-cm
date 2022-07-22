const { BaseConfig } = require("@voyom/core");
const { merge } = require("webpack-merge");
const { DefinePlugin } = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const join = (...dir) => path.join(process.cwd(), ...dir);
const HtmlWebpackPlugin =require("html-webpack-plugin");
const envs=require("./src/envs/config-env");
const { ManageTempalteWatchDir } = require("@ztwx/auto-template");

module.exports=({env,config})=>{
  const dev=env==="development";
  process.env.NODE_ENV=env;
  const c=envs[config];
  const baseUrl=c.baseUrl;

  if (env === "development") {
    new ManageTempalteWatchDir().watch(join("example/src"));
  }

  return merge(
    BaseConfig({
      baseUrl,
      sassOptions: {
        sourceMap: true,
        additionalData: "$--voyo-platform: h5;$--voyo-platform-h5: true;",
      },
      tsLoaderConfig:{
        configFile: join("example/example-tsconfig.json"),
        transpileOnly: true,
        happyPackMode: false,
        appendTsxSuffixTo: [
          '\\.vue$'
        ]
      }
    }),
    {
      mode: dev?"development":"production",

      devtool: dev? "inline-source-map": false,
      devServer: {
        hot:true,
        client:{
          logging:"warn"
        },
        port: 3600,
        historyApiFallback:{
          rewrites: [{ from: /.*/, to: baseUrl + "index.html" }],
        }
      },
      optimization:{
        sideEffects: true,
        splitChunks: {
          cacheGroups: {
            poly: {
              chunks: "initial",
              filename: "voyo.js",
              test: /node_modules\/@voyo\//,
              priority: -5,
              reuseExistingChunk: true,
            },
            // vendor: {
            //   chunks: "all",
            //   filename: "poly.js",
            //   test: /node_modules[\\/](core-js)[\\/]/,
            //   priority: -5,
            //   reuseExistingChunk: true,
            // }
          },
        },
      },
      module:{
        rules: [
          {
            resourceQuery: /voyo=hljs/,
            use: [
              {
                loader: join("plugins/highlight-loader/index.js"),
                options: {
                  style: "xcode",
                  customPreCss: "yo-code-pre",
                },
              },
            ],
          },
          {
            test: /\.md$/,
            use: [
              {
                loader: join("plugins/markdown-loader/index.js"),
                options: {
                  style: "xcode",
                  customPreCss: "yo-code-pre",
                },
              },
            ],
          },
        ],
      },
      externals:{
        vue: "window['vue']",
        "element-ui": "window['yo-element-ui']",
      },
      resolve: {
        alias: {
          "@": join("example","src"),
          "@env": join("example","src/envs/config.ts"),
          "@voyo/yo-cm": join("src/index.ts"),
          "@voyo/yo-cm-tmp" : join("")
        },
      },
      entry:{
        main: [
          join("example","src/main.ts"),
          join("example","src/styles/index.scss")
        ]
      },
      output:{
        clean: !dev ,
        filename: "[name].[hash:8].js",
        publicPath: baseUrl,
        chunkFilename: "js/[name].[hash:8].js",
        path: join("example-dist"),
      },
      plugins:[
        // new (require("webpack-bundle-analyzer").BundleAnalyzerPlugin)(),
        new HtmlWebpackPlugin({
          baseUrl,
          minify:false,
          filename: "index.html",
          template: join("example/example.html"),
          cssFiles: ["ele/element-vue.css","css/cmNzx.css"],
          jsFiles: ["ele/element-vue.js"],
        }),
        new DefinePlugin({
          BASE_URL: JSON.stringify(c.baseUrl),
          CONFIG: JSON.stringify(c),
        }),
        new CopyPlugin({
          patterns: [
            {
              from: "example/static",
              to: "",
              globOptions: {
                ignore: ["**/index.html"],
              },
            },
          ]
        })
      ]
    }
  )
}

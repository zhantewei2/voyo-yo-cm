const { BaseConfig } = require("@voyom/core");
const { merge } = require("webpack-merge");
const { DefinePlugin } = require("webpack");
const path = require("path");
const join = (...dir) => path.join(process.cwd(), ...dir);
const HtmlWebpackPlugin =require("html-webpack-plugin");


module.exports=({env})=>{
  const baseUrl="/";
  const dev=env==="development";
  process.env.NODE_ENV="development";
  
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
      mode: "development",
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
      entry:{
        main: [
          join("example/src/main.ts")
        ]
      },
      output:{
        clean: !dev ,
        filename: "[name].[hash:8].js",
        publicPath: baseUrl,
        path: join("example-dist"),
      },
      plugins:[
        new HtmlWebpackPlugin({
          baseUrl,
          minify:false,
          filename: "index.html",
          template: join("example/example.html")
        })
      ]
    }
  )
}
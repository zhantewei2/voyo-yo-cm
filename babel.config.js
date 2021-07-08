console.log("babel2")
module.exports = {
  presets: [
    ["@babel/preset-env",{
      // "useBuiltIns":"usage",
      // "corejs":3,
      "modules": false
    }],
    "@vue/babel-preset-jsx"
  ],
  
  // plugins: ["@babel/plugin-transform-runtime"],
};

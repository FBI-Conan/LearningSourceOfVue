const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: resolve(__dirname, "src/index.js"),
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "src/index.html"),
      filename: "index.html"
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, "build"),
    port: 3000,
    compress: true,
    open: true,
  }
}
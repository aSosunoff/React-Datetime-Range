const path = require("path");
const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const commonWebpack = require("./webpack.common.js");

const fileName = (ext) => `[name].${ext}`;

module.exports = merge(commonWebpack, {
  mode: "development",

  devtool: "eval-source-map",

  output: {
    filename: fileName("js"),
    path: path.resolve(__dirname, "../dist"),
  },

  devServer: {
    port: 9000,
    hot: true,
    compress: true,
    publicPath: "/",
    contentBase: path.join(__dirname, "../dist"),
    historyApiFallback: true,
    writeToDisk: false,
    stats: "minimal",
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: fileName("css") }),
    new ReactRefreshWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: false,
      },
    }),
  ].filter(Boolean),
});

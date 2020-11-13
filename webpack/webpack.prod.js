const path = require("path");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const commonWebpack = require("./webpack.common.js");

const filename = (ext) => `[name].[contenthash].${ext}`;

module.exports = merge(commonWebpack, {
  mode: "production",

  devtool: "source-map",

  output: {
    publicPath: "/",
    filename: filename("js"),
    path: path.resolve(__dirname, "../build"),
  },

  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin({})].filter(
      Boolean
    ),
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),

    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: true,
      },
    }),
  ].filter(Boolean),
});

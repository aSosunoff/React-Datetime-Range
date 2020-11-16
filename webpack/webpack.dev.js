const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const fileName = (ext) => `[name].${ext}`;

module.exports = {
  mode: "development",

  context: path.resolve(__dirname, "../demo"),

  devtool: "eval-source-map",

  entry: {
    main: ["./index.js"],
  },

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
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [require.resolve("react-refresh/babel")],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};

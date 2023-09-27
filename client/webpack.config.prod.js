const path = require("node:path");
const copyPlugin = require("copy-webpack-plugin");
const cleanPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/app.ts",
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "server", "public"),
  },
  plugins: [
    new cleanPlugin.CleanWebpackPlugin(),
    new copyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "../", "server", "public"),
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};

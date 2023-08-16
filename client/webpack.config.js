const path = require("node:path");

module.exports = {
  entry: "./src/app.ts",
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "/"),
    },
    open: true,
  },
  devtool: "inline-source-map",
  mode: "development",
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
    path: path.resolve(__dirname, "public"),
    publicPath: "/public/",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};

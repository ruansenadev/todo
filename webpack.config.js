const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const reactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevMode = process.env.NODE_ENV != "production";

module.exports = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              isDevMode && require.resolve("react-refresh/babel")
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  mode: isDevMode ? "development" : "production",
  devtool: isDevMode ? "eval-source-map" : "source-map",
  plugins: [
    isDevMode && new reactRefreshWebpackPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html")
    })
  ].filter(Boolean),
  devServer: {
    static: path.resolve(__dirname, "public"),
    hot: true
  }
}
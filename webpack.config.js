const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = process.env.env || "development"

module.exports = {
  entry: './src/main.js',
  target: "web",
  mode: env,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3040,
    hot: false,
    liveReload: true,
    static: { 
      directory: './dist',
      watch: true
    },
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "index.html"),
          inject: false,
      })
  ],
};
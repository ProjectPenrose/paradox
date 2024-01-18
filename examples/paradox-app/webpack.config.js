const path = require("path")
const webpack = require("webpack")

const CopyWebpackPlugin = require("copy-webpack-plugin");

const env = process.env.env || "development"

module.exports = {
  entry: './build/src/index.js',
  target: "web",
  mode: env,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/dist/js')
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./index.html", to: "../index.html" },
      ],
    }),
  ],
};
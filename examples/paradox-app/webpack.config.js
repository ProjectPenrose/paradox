const path = require("path")
const webpack = require("webpack")

const TersePlugin = require("terser-webpack-plugin");

const env = process.env.env || "development"

module.exports = {
  entry: './build/app/index.js',
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
  optimization: {
    minimize: true,
    minimizer: [
      new TersePlugin({
        include: /\.min\.js$/,
      }),
    ],
    splitChunks: {
      chunks: "all",
      name: "common",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  stats: {
    children: true,
    errorDetails: true,
  },
};
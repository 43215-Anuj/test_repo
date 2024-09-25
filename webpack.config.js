const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config({ path: "./.env" });
const webpack = require("webpack");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: "./src/index.js", // Entry point of your application
  output: {
    filename: "bundle.js", // Output bundle file name
    path: path.resolve(__dirname, "build"), // Output directory
  },
  devServer: {
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    port: 3000, // Port for the development server
    open: true, // Open the default web browser when the server starts
    client: {
      overlay: false,
    },
    static: {
      directory: path.join(__dirname, "public"), // Serve files from this directory
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(tsx|ts)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(png|svg|jpe?g|jpg|gif|pdf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "/public",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      emitWarning: true, // Emit warnings instead of errors
      failOnError: false, // Do not fail the build on errors
      failOnWarning: false, // Do not fail the build on warnings
      overrideConfig: {
        rules: {
          // Define specific rules you want as warnings
          'no-unused-vars': 'warn',
          // Add any other rules you want to treat as warnings
        }
      }
    }),
  ],
};

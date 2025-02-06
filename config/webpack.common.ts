const htmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require('../package.json')
const path = require("path");

const TmxEarth = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader",
          options: {
            injectType: "singletonStyleTag",
            insert: require.resolve("../src/utils/styleScope.ts"),
          },
        }, "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader'
            }
          }
        ]
      }
    ],
  },
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../build'),
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".tsx", ".ts"],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      favicon: 'public/favicon.png',
    }),
    new ModuleFederationPlugin({
      name: "TmxEarth",
      filename: "remoteEntry.js",
      exposes: {
        "./TmxEarth": "./src/App.tsx",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"] 
        },
        "boostrap": {
          singleton: true,
          requiredVersion: dependencies["bootstrap"] 
        },
      },
    }),
  ],
};

module.exports = TmxEarth;
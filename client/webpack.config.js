const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Generates the index.html file with the bundle script injected
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),

      // Generates the PWA manifest file
      new WebpackPwaManifest({
        name: "My App",
        short_name: "App",
        description: "My Progressive Web App",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),

      // Injects the service worker into the output HTML file
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "sw.js",
      }),
    ],

    module: {
      rules: [
        // Loads CSS files
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },

        // Transpiles JS files using Babel
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};

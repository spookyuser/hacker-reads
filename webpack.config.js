const path = require("path");
const SizePlugin = require("size-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");

const config = {
  stats: "errors-only",
  entry: {
    "background-script": "./source/background/background-script",
    "content-script": "./source/foreground/content-script"
  },
  output: {
    path: path.join(__dirname, "distribution"),
    filename: "[name].js"
  },
  module: {
    rules: [
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, "css-loader"] }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new SizePlugin(),
    new RemovePlugin({
      /**
       * Before compilation permanently removes
       * entire `./dist` folder.
       */
      before: {
        include: ["./distribution"]
      }
    }),
    new CopyWebpackPlugin([
      {
        from: "**/*",
        context: "source",
        ignore: ["*.js", "*.css"]
      }
    ])
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          compress: false,
          output: {
            beautify: true,
            indent_level: 2 // eslint-disable-line camelcase
          }
        }
      })
    ]
  }
};

// Mode specific settings
// From: https://webpack.js.org/configuration/mode/
module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
  }

  if (argv.mode === "production") {
    config.plugins.push(
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [
            "default",
            { normalizeWhitespace: false, discardComments: { removeAll: true } }
          ]
        }
      })
    );
  }

  return config;
};

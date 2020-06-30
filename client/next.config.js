const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ANALYZE = process.env.ANALYZE;
const withSass = require("@zeit/next-sass");
const withPlugins = require("next-compose-plugins");
const dev = process.env.NODE_ENV !== "production";

const cssModulesConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 2,
    localIdentName: "[local]_[name]_[hash:base64:5]",
  },
};

const nextConfiguration = {
  webpack: (config) => {
    config.resolve.modules.push(__dirname);
    config.resolve.alias["@styles"] = path.join(__dirname, "src/styles");

    //See https://github.com/zeit/next.js/issues/2324
    if (config.resolve.alias) {
      delete config.resolve.alias["react"];
      delete config.resolve.alias["react-dom"];
    }
    //檢測 webpack bundle js 工具
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      );
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = withPlugins(
  [
    [withSass, cssModulesConfig]
  ],
  nextConfiguration
);

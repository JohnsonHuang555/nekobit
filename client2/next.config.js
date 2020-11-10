const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ANALYZE = process.env.ANALYZE;
const dev = process.env.NODE_ENV !== "production";

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

module.exports = nextConfiguration;
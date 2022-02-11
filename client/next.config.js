const TerserPlugin = require("terser-webpack-plugin");

// /** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
// module.exports = withBundleAnalyzer({});

module.exports = {
  // future: {
  //   webpack5: true,
  // },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.optimization.minimizer = [new TerserPlugin({ parallel: 1 })];
    return config;
  },
};

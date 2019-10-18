const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
  mode: 'development',
  plugins: [
    new BundleAnalyzerPlugin({
        analyzerMode: 'static'
    })].concat(baseConfig.plugins)
});
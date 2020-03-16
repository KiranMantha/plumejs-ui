const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

baseConfig.plugins.push(new BundleAnalyzerPlugin({
    // Port that will be used by in `server` mode to start HTTP server. 
    analyzerPort: 4001
}));

module.exports = merge(baseConfig, {
    mode: 'production'
});
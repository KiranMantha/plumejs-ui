const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const path = require('path');

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        hot: true,
        port: 3001,
        open: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/' },
                { from: /./, to: '/' }
            ]
        }
    },
    watch: true
});

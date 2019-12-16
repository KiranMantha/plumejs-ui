const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const appconstants = {
    publicPath: '/',
    sourceDir: '../src',
    buildDir: '../dist'
}

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/index.ts',
        styles: './src/main.scss'
    },
    output: {
        path: path.resolve(__dirname, appconstants.buildDir),
        publicPath: appconstants.publicPath,
        filename: '[name]-[hash:6].js'
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, appconstants.sourceDir)
        },
        extensions: ['.ts', '.js', '.scss', '.css']
    },
    module: {
        rules: [{
            test: /.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: true
                }
            }]
        }, {
            test: /\.(s*)css$/,
            use: ["css-loader", "sass-loader"]
        }, {
            test: /\.html$/,
            use: ["html-loader"]
        }, {
            test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader'],
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, appconstants.sourceDir + "/index.html"),
            filename: "./index.html",
            inject: "head",
            minify: {
                collapseWhitespace: false
            }
        }),
        new ManifestPlugin(),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '-',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
};
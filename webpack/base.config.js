const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, '../src')
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
            },{
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  configFile: 'tsconfig.json',
                }
            }]
        },{
            test: /\.(s*)css$/,
            use: ["css-loader", "sass-loader"]
        },{
            test: /\.html$/,
            use: ["html-loader"]
        },{
            test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader'],
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
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
        runtimeChunk: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ],
        splitChunks: {
            chunks: 'all'
        }
    }
};
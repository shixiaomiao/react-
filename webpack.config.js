/**
 * Created by shijiale on 2017/5/20.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
       // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './index.html'})
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 1233,
        openPage: './dist/index.html',
        overlay: true
    }
};

module.exports = config;

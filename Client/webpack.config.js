/**
 * Created by hand on 2016/11/24.
 */
'use strict';

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
    entry: {
        app: ['./src/script/app']
    },
    output: {
        path: __dirname + '/www/',
        publicPath: './',
        filename: 'script/[name].[hash].bundle.js',
        sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',
    externals: {
        'angular': 'angular',
        'angular-route': 'angular-route',
        'angular-animate': 'angular-animate',
        'bootstrap':'bootstrap',
        'angular-bootstrap':'angular-bootstrap'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src/bower_components'],
        extensions: ['', '.webpack.js', '.js']
    },
    module: {
        loaders: [
            {
                // CSS LOADER
                // Reference: https://github.com/webpack/css-loader
                // Allow loading css through js
                //
                // Reference: https://github.com/postcss/postcss-loader
                // Postprocess your css with PostCSS plugins
                test: /\.css$/,
                // Reference: https://github.com/webpack/extract-text-webpack-plugin
                // Extract css files in production builds
                //
                // Reference: https://github.com/webpack/style-loader
                // Use style-loader in development.
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap', {publicPath: "../"})
            }, {
                // ASSET LOADER
                // Reference: https://github.com/webpack/file-loader
                // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
                // Rename the file using the asset hash
                // Pass along the updated reference to your code
                // You can add here any file extension you want to get copied to your output
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot)$/,
                loader: 'url-loader?limit=8192'
            }, {
                test: /\.(ttf)$/,
                loader: 'file-loader?name=css/font/[hash].[ext]'
            }
            // {
            //   // HTML LOADER
            //   // Reference: https://github.com/webpack/raw-loader
            //   // Allow loading html through js
            //   test: /\.html$/,
            //   loader: 'raw'
            // }
        ]
    },
    plugins: [
        // function() {
        //   this.plugin('done', function(stats) {
        //     require('fs').writeFileSync(
        //       path.join(__dirname, './', 'stats.json'),
        //       JSON.stringify(stats.toJson()));
        //   });
        // },
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'script/common.[hash].js'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                collapseBooleanAttributes: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true
            },
            inject: false
        })
        //new ExtractTextPlugin("css/app.[contenthash].bundle.css", {
        //    allChunks: true
        //})
    ]
};



module.exports = webpackConfig;
'use strict';

var babelConfig = require('./.babelrc.json');
var path = require('path');
var webpack = require('webpack');

var isProduction = process.env.NODE_ENV === 'production';

var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
    })
];

if (isProduction) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: false
    }));
}

module.exports = function(config) {
    return {
        entry: {
            retrospective: config.assets + 'javascripts/retrospective.jsx',
            team: config.assets + 'javascripts/team.jsx',
        },
        output: {
            path: __dirname,
            filename: config.dist + 'javascripts/[name].js'
        },
        module: {
            preLoaders: [
                { test: /\.js?$/, loader: "eslint-loader", exclude: /node_modules/ }
            ],
            loaders: [
                { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: babelConfig },
            ]
        },
        plugins: plugins,
        resolve: {
            alias: {
                containers: config.assets + 'javascripts/containers',
                components: config.assets + 'javascripts/components',
                reducers: config.assets + 'javascripts/reducers',
                model: config.assets + 'javascripts/domain/model',
                infrastructure: config.assets + 'javascripts/infrastructure',
            },
            extensions: ['', '.js', '.jsx']
        }
    };
};

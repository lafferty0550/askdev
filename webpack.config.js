const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const nodemon = require('nodemon');
const webpack = require('webpack');
const rimraf = require('rimraf');
require('dotenv').config();

const ENV = process.env.NODE_ENV || 'production';

const _root = path.resolve();
const _src = path.join(_root, '/src');

const _front = path.join(_src, '/front');
const _server = path.join(_src, '/server');
const _common = path.join(_src, '/common');
const _init = path.join(_src, '/init');

const _frontEntry = path.join(_front, '/launcher.tsx');
const _backEntry = path.join(_server, '/launcher.ts');
const _initEntry = path.join(_init, '/launcher.ts')

const _build = path.join(_root, '/build');
const _output = path.join(_build, '/public');

const aliases = {};

rimraf(_output, () => console.log(`=========DELETED=========  ${_output}`));

const front = {
    mode: ENV,
    context: _front,
    name: 'front',
    entry: _frontEntry,
    output: {
        path: _output,
        filename: '[hash].bundle.js',
        chunkFilename: '[hash].[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html'
        })
    ],
    resolve: {
        alias: aliases,
        extensions: ['.ts', '.tsx', '.js']
    }
};

const server = {
    mode: ENV,
    name: 'back',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        back: _backEntry,
        init: _initEntry
    },
    output: {
        path: _build,
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        alias: aliases,
        extensions: ['.ts', '.js']
    }
};

let nodemonIsLaunched = false;
const compiler = webpack([front, server]);
const statsHandler = (err, stats) => {
    if (err)
        console.log('webpack:build', err);

    if ((ENV === 'development') && !nodemonIsLaunched) {
        nodemon({
            script: 'build/back.js',
            watch: 'build/back.js'
        }).on('restart', () => {
            process.env.NODEMON_STATUS = 'restarted'
        });
        nodemonIsLaunched = true;
    }
    console.log(stats.toString({
        all: false,
        colors: true,
        errors: true,
        errorDetails: true,
        builtAt: true,
        warnings: true
    }));
}

if (ENV === 'development')
    compiler.watch({}, statsHandler);
else
    compiler.run(statsHandler);


// =============== for webstorm
module.exports = {
    resolve: {
        alias: aliases
    }
};
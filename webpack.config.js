var path = require('path');

var config = {
    entry: './main.js',
    watch: true,
    output: {
        path: __dirname,
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [],
    devServer: {
        contentBase: './dist',
        overlay: true
    }
};

module.exports = config;
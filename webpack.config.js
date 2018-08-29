const path = require('path');

module.exports = {
    entry: './js/app.jsx',
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'out.js',
        publicPath: 'js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'es2015', 'stage-2', 'react'
                        ]
                    }
                }
            }
        ]
    },
    devServer: {
        port: 3002,
        open: true,
        contentBase: './'
    },
    plugins: [],
    watch: true,
    mode: 'development',
    devtool: 'source-map'
};
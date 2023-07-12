//import path
const path = require('path');

module.exports = {
    entry: ['./client/app.js'],
    output: {
        path: __dirname,
        filename: './public/bundle.js',
        sourceMapFilename: './public/bundle.map'
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }

}
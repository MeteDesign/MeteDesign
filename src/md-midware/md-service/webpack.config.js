var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        index: './test/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, './dist/'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map'
    }
}

module.exports.devServer = {
    port: 4000,
    contentBase: './build',
    host: '0.0.0.0',
    hot: true,
    inline: true,
    historyApiFallback: true,
    publicPath: '',
    stats: {
        colors: true
    }
}
// }

var path = require('path')
var webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    index: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      }
    })
  ],
  module: {
    rules: [
      // js or jsx loader
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['es2015', { 'modules': false }]],
            cacheDirectory: true
              // Since babel-plugin-transform-runtime includes a polyfill that includes a custom regenerator runtime and core.js, the following usual shimming method using webpack.ProvidePlugin will not work:
              // plugins: ['transform-runtime']
          }
        }
      }
    ]
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

var path = require('path')
var webpack = require('webpack')
var glob = require('glob')
var ExtractTextPlugin = require('extract-text-webpack-plugin') // 单独打包css
var HtmlWebpackPlugin = require('html-webpack-plugin') // HTML文件处理
// var OpenBrowserPlugin = require('open-browser-webpack-plugin')
// var CleanPlugin = require('clean-webpack-plugin')
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin // 单独打包公共模块插件
// var getEntry = function() {
// 	var entry = {}
// 	//读取开发目录,并进行路径裁剪
// 	glob.sync('./src/**/*.js')
// 		.forEach(function(name) {
// 			var start = name.indexOf('src/') + 4,
// 				end = name.length - 3
// 			var n = name.slice(start, end)
// 			n = n.slice(0, n.lastIndexOf('/'))
// 			//保存各个组件的入口
// 			entry[n] = name
// 		})
// 	return entry
// }
var prod = process.env.NODE_ENV === 'production' ? true : false
var out_path = prod ? './dist' : './build'
module.exports = {
  entry: {
    index: path.join(__dirname, 'src/components/index.js')
  },
  output: {
    path: path.join(__dirname, out_path),
    filename: prod ? 'js/[name].min.js' : 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: ''
  },
  resolve: {
    root: [],
    extensions: ['', '.js', '.jsx', 'scss']
  },
  module: {
    loaders: [{
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'url?limit=8024&name=images/[name].[ext]'
    }, {
      test: /\.(woff2?|otf|eot|svg|ttf)$/i,
      loader: 'url?name=fonts/[name].[ext]'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!less')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
    }, {
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  babel: {
    presets: [
      ['es2015', {
        'loose': true
      }], 'react', 'stage-0'
    ],
    plugins: ['transform-runtime', 'transform-class-properties']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
//   filename: 'index.html',

      template: './src/HTMLtemplate/index.html'
    }),
    // new CleanPlugin(['dist', 'build']),
    // 启动热替换
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/[name].css', {
      allChunks: true
    })
  // new webpack.NoErrorsPlugin(),
  // new OpenBrowserPlugin({
  // 	url: 'http://localhost:8080'
  // }),
  /* 公共库 */
  // new CommonsChunkPlugin({
  // 	name: 'vendors',
  // 	minChunks: Infinity
  // }),
  ]
}
// 判断开发环境还是生产环境,添加uglify等插件
// if (process.env.NODE_ENV === 'production') {
// 	module.exports.plugins = (module.exports.plugins || [])
// 		.concat([
// 			new webpack.DefinePlugin({
// 				'process.env': {
// 					NODE_ENV: JSON.stringify('production')
// 				}
// 			}),
// 			new webpack.optimize.UglifyJsPlugin({
// 				compress: {
// 					warnings: false
// 				}
// 			}),
// 			new webpack.optimize.OccurenceOrderPlugin(),
// 		])
// } else {
// 	module.exports.devtool = 'source-map'
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
// }

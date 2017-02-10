var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //将你的行内样式提取到单独的css文件里，

module.exports = {
	//入口
	entry: {
		//配置入口文件，有几个写几个
		index: './index.js'
	},
	//出口
	output: {
		path: path.join(__dirname, '/'), //打包后生成的目录
		filename: 'js/[name].js', //根据对应入口名称，生成对应js名称
	},
	//解决方案
	resolve: {
		root: [],
		extensions: ['', '.js', '.jsx']
	},
	module: {
		//加载器
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			exclude: /node_modules/,
			query: {
				cacheDirectory: true,
				presets: ['react', 'es2015']
			}
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style', 'css')
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style', 'css!sass')
		}, {
			test: /\.json$/,
			loader: 'json',
		}, {
			test: /\.(jpe?g|png|gif|svg)$/,
			loader: 'url?limit=8024&name=images/[name].[ext]'
		}, {
			test: /\.(woff2?|otf|eot|svg|ttf)$/i,
			loader: 'url?name=fonts/[name].[ext]'
		}, ]
	},
	babel: {
		presets: [
			["es2015", {
				"loose": true
			}], "react", "stage-0"
		],
		plugins: ["transform-runtime", "transform-class-properties"]
	},
	plugins: [
		new ExtractTextPlugin("css/[name].css"), //提取CSS行内样式，转化为link引入
	],
	devtool: 'source-map',
	devServer: {
		// contentBase: './dist',
		host: 'localhost',
		port: 8081, //端口
		inline: true,
		hot: false,
	}
};
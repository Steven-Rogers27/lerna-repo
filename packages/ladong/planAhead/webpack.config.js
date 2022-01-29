const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const ConsoleLogOnBuildWebpackPlugin = require('./ConsoleLogOnBuildWebpackPlugin');

const rootPath = path.join(__dirname, '../../../');
const staticPath = path.join(rootPath, 'static');
const staticJsPath = path.join(staticPath, 'js/'); 
module.exports = {
	mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
	entry: {
	},
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
        test: /\.html$/i,
        loader: "html-loader",
				options: {
          sources: {
						list: [
							{
								tag: "img",
                attribute: "src",
                type: "src",
							},
						],
					},
        },
      },
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'newList.html'),
		}),
		new CopyPlugin({
      patterns: [
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/jquery-1.8.3.js'.replace(/\\/g, '/')),
					to: "dest",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/vue.js'.replace(/\\/g, "/")),
					to: "dest",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/elementui.js'.replace(/\\/g, "/")),
					to: "dest",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/dx.js'.replace(/\\/g, "/")),
					to: "dest",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/component.js'.replace(/\\/g, "/")),
					to: "dest",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/common.css'.replace(/\\/g, "/")),
					to: "dest",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/elementui.css'.replace(/\\/g, "/")),
					to: "dest",
				},
      ],
    }),
		new ConsoleLogOnBuildWebpackPlugin({
			param1: 'this is my param',
		}),
	],
	devServer: {
    static: path.join(__dirname, 'dist'),
		host: 'sunw.dx185.com',
		server: 'https',
		port: 3000,
		compress: true,
		hot: true,
		open: true,
  },
};
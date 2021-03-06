const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Handlebars = require("handlebars");

const rootPath = path.join(__dirname, '../../../');
const staticPath = path.join(rootPath, 'static');
const staticJsPath = path.join(staticPath, 'js/');

const jsAssets = [
	'static/js/jquery-1.8.3.js',
	'static/js/vue.js',
	'static/js/elementui.js',
	'static/dx.js',
	'static/js/component.js',
];

const cssAssets = [
	'../../../static/common.css',
	'../../../static/elementui.css',
	'./newList.css',
];

module.exports = {
	mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
	entry: {
		newList: path.resolve(__dirname, 'newList.js'),
	},
	output: {
		filename: '[name].[contenthash].bundle.js',
		path: path.join(__dirname, 'dist'),
		clean: true,
		publicPath: '/ladong/planAhead/',
	},
	module: {
		rules: [
			{
        test: /\.css$/i,
				exclude: /(common|elementui)\.css$/i, // 必须加上
				loader: 'css-loader',
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
        test: /\.html$/i,
				use: [
					{
						loader: "html-loader",
						options: {
							sources: {
								list: [
									{
										tag: "img",
										attribute: "src",
										type: "src",
									},
									{
										tag: 'link',
										attribute: 'href',
										type: 'src',
									},
									{
										tag: 'script',
										attribute: 'src',
										type: 'src',
										// 不处理html中引用的静态js文件
										filter: (tag, attribute) => {
											return false;
										},
									},
								],
							},
							// preprocessor: (content, loaderContext) => {
							// 	let result;

							// 	try {
							// 		result = Handlebars.compile(content)({
							// 			planPageUrl: 'http://localhost:3001/tunnel/plan.html',
							// 		});
							// 	} catch (error) {
							// 		loaderContext.emitError(error);

							// 		return content;
							// 	}

							// 	return result;
							// },
						},

					},
				],
      },
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'newList.html'),
			filename: 'newList.html',
			inject: 'body',
			// templateParameters: (compilation, assets, assetTags, options) => {
      //   return {
			// 		compilation,
			// 		webpackConfig: compilation.options,
      //     htmlWebpackPlugin: {
      //       tags: {
			// 				headTags: cssAssets.map((href) => {
			// 					return {
			// 						tagName: 'link',
			// 						attributes: {
			// 							rel: 'stylesheet',
			// 							type: 'text/css',
			// 							href: href,
			// 						},
			// 					};
			// 				}),
			// 				bodyTags: jsAssets.map((src) => {
			// 					return {
			// 						tagName: 'script',
			// 						attributes: {
			// 							src: src,
			// 							type: 'text/javascript',
			// 							charset: 'utf-8',
			// 						},
			// 					};
			// 				}),
			// 			},
      //     },
      //   };
      // },
		}),
		// 从缓存的角度考虑，对于不会改变的静态文件用copy，对于会改变的文件用loader每次重新生成名称
		new CopyPlugin({
      patterns: [
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/jquery-1.8.3.js'),
					to: "static/js/",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/vue.js'),
					to: "static/js/",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/elementui.js'),
					to: "static/js/",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/dx.js'),
					to: "static",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/component.js'),
					to: "static/js/",
				},
      ],
    }),
		new CleanWebpackPlugin(),
	],
	devServer: {
    static: path.join(__dirname, 'dist'),
  },
};
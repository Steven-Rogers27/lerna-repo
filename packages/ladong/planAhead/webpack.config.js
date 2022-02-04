const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const ConsoleLogOnBuildWebpackPlugin = require('./ConsoleLogOnBuildWebpackPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
		publicPath: '/',
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
							// 	let result = content;
							// 	let hasStyle = true;
							// 	while (hasStyle) {
							// 		// start tag of <style>
							// 		let ss = result.match(/<style(\s[a-z]+\s?=\s?('|")[\sa-z/]+('|"))+>/);
							// 		let ssIdx = -1,
							// 				esIdx = -1;
							// 		// end tag of <style>
							// 		let es = result.match(/<\/style>/);
							// 		if (ss) {
							// 			ssIdx = ss.index;
							// 		}
							// 		if (es) {
							// 			esIdx = es.index;
							// 		}
							// 		let index = 1;
							// 		if (ssIdx > -1 && esIdx > -1) {
							// 			hasStyle = true;
							// 			// 提取出css样式到单独的文件
							// 			let cssStart = ssIdx + ss[0].length;
							// 			let css = result.slice(cssStart, esIdx);
							// 			const cssFileName = `style${index}.css`;
							// 			const cssFilePath = path.resolve(__dirname, cssFileName);
							// 			fs.appendFile(cssFilePath, css, (err) => {
							// 				if (err) {
							// 					console.error(err);
							// 				}
							// 			});
							// 			// html文件的剩余内容
							// 			let pre = result.slice(0, ssIdx);
							// 			pre += `<link rel="stylesheet" type="text/css" href="${cssFileName}" />`
							// 			// </style>从 / 开始有7个字符
							// 			let post = result.slice(esIdx + 8);
							// 			result = `${pre}${post}`;
							// 		} else {
							// 			hasStyle = false;
							// 		}
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
		}),
		// 从缓存的角度考虑，对于不会改变的静态文件用copy，对于会改变的文件用loader每次重新生成名称
		new CopyPlugin({
      patterns: [
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/jquery-1.8.3.js'.replace(/\\/g, '/')),
					to: "static/js/",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/vue.js'.replace(/\\/g, "/")),
					to: "static/js/",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/elementui.js'.replace(/\\/g, "/")),
					to: "static/js/",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/dx.js'.replace(/\\/g, "/")),
					to: "static",
				},
        {
					from: path.posix.join(rootPath.replace(/\\/g, "/"), 'static/js/component.js'.replace(/\\/g, "/")),
					to: "static/js/",
				},
      ],
    }),
		new ConsoleLogOnBuildWebpackPlugin({
			param1: 'this is my param',
		}),
		new CleanWebpackPlugin(),
	],
	devServer: {
    static: path.join(__dirname, 'dist'),
  },
};
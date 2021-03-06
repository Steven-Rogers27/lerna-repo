const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config');
const compiler = webpack(config);

const PORT = 3000;
const appName = 'planAhead';
// 目录名
const dirNames = [
	'/ladong/planAhead/',
];

const entryPage = {
	'/ladong/planAhead/': 'newList.html',
};
	

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
		writeToDisk: true,
	})
);
app.use(/^\/$/, (req, res, next) => {
	// 把output.publicPath设为默认首页的路径，newList.html设为默认首页
	res.redirect(path.posix.join(config.output.publicPath, entryPage[config.output.publicPath]));
});
// 把形如/ladong/planAhead这样的请求重定向到/ladong/planAhead/newList.html
dirNames.forEach((name) => {
	app.use(name.slice(0, -1), (req, res, next) => {
		res.redirect(path.posix.join(name, entryPage[name]));
	});
});
app.use(express.static(path.join(__dirname, config.output.publicPath), {
	redirect: true,
	index: entryPage[config.output.publicPath],
}));
app.listen(PORT, () => {
	console.log(`${appName} app listening on port ${PORT}!\n`);
});
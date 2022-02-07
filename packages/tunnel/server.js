const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config');
const compiler = webpack(config);

const PORT = 3001;
const appName = 'tunnel';
// 目录名
const dirNames = [
	'/tunnel/',
];

const entryPage = {
  '/tunnel/': 'plan.html',
};

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
		writeToDisk: true,
	})
);
app.use(/^\/$/, (req, res, next) => {
	// 把output.publicPath设为默认首页的路径
	res.redirect(path.posix.join(config.output.publicPath, entryPage[config.output.publicPath]));
});
// 当请求路径是目录，且没有后缀'/'时，给其后拼上'/'
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

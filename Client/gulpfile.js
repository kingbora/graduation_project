/**
 * Created by hand on 2016/11/23.
 */
var gulp = require('gulp');
var del = require('del');
var webpack = require("webpack");
var WebpackDevServer = require('webpack-dev-server');
var opn = require('opn');
var runSequence = require('run-sequence');
var gutil = require("gulp-util");

gulp.task('copy-dev', function () {
    return gulp.src([
        'src/**/*',
        '!src/index.html'])
        .pipe(gulp.dest('www'));
});

gulp.task('copy-prod', function () {
    return gulp.src([
        'src/**/*',
        '!src/index.html',
        '!src/script/*',
        '!src/script/**/*'])
        .pipe(gulp.dest('www'));
});

gulp.task('clean', function () {
    del(['www/*']);
});
gulp.task("webpack:build", ['set-prod-node-env'], function (callback) {
    // webpack prod config
    var webpackProdConfig = Object.create(require('./webpack.config.js'));
    webpackProdConfig.devtool = undefined;
    webpackProdConfig.plugins = webpackProdConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // create a single instance of the compiler to allow caching
    var webpackProdCompiler = webpack(webpackProdConfig);

    // run webpack
    webpackProdCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build", err);
        }
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});
gulp.task("webpack:build-dev", ['set-dev-node-env'], function (callback) {
    // webpack dev config
    var webpackDevConfig = Object.create(require('./webpack.config.js'));
    webpackDevConfig.devtool = "source-map";
    webpackDevConfig.debug = true;
    var webpackDevCompiler = webpack(webpackDevConfig);

    // run webpack
    webpackDevCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
        }
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});
gulp.task("webpack:dev-server", function (callback) {
    // modify some webpack config options
    var webpackDevConfig = Object.create(require('./webpack.config.js'));
    webpackDevConfig.devtool = "source-map";
    webpackDevConfig.debug = true;
    // for inline mode and HMR
    webpackDevConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8000/", "webpack/hot/dev-server");
    webpackDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(webpackDevConfig), {
        hot: true,
        contentBase: "./www/",
//        publicPath: "/" + webpackDevConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8000, "0.0.0.0", function (err) {
            if (err) {
                throw new gutil.PluginError("webpack-dev-server", err);
            }
            gutil.log("[webpack-dev-server:iframe]", "http://localhost:8000/webpack-dev-server/index.html");
            gutil.log("[webpack-dev-server:inline (suggested)]", "http://localhost:8000/index.html");
        });
});
gulp.task('build-dev', function (callback) {
    runSequence('copy-dev', ['webpack:build-dev'], callback);
});
gulp.task('build-prod', function (callback) {
    runSequence('copy-prod', ['webpack:build'], callback);
});
gulp.task('set-dev-node-env', function () {
    return process.env.NODE_ENV = 'development';
});
gulp.task('set-prod-node-env', function () {
    return process.env.NODE_ENV = 'production';
});
gulp.task("run-dev", function (callback) {
    runSequence('build-dev', ['webpack:dev-server', 'watch', 'open'], callback);
});
gulp.task("run-prod", function (callback) {
    runSequence('build-prod', ['webpack:dev-server', 'watch', 'open'], callback);
});

gulp.task("open", function (callback) {
    var isWin = /^win/.test(process.platform);
    var isOSX = /^darwin/.test(process.platform);
    var appName = isWin ? 'chrome' : isOSX ? 'google chrome' : 'google-chrome';
    opn('http://localhost:8000/index.html', {app: [appName]});
    callback();
});
gulp.task('watch', function () {
    gulp.watch(['src/**/*', '!src/index.html'], ["copy-dev"]);
});


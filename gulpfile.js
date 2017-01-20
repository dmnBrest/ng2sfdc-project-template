var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack-stream');

/* CLIENT:BUILD */
const clientBuild = gulp.task('client:build:dev', function() {
	return gulp.src('')
			.pipe(webpack( require('./webpack.dev.js') ))
			.pipe(gulp.dest('dist/js'));
});

gulp.task('start', ['client:build:dev'], function () {
	gulp.watch('src/**/*', ['client:build:dev']);
});


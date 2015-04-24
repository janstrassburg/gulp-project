var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var html2js = require('gulp-html-js-template');

var paths = {
	templates: [
		'src/views/*.html'
	],
	scripts: [
		'dist/templates.js',
		'src/js/*.js'
	]
};

gulp.task('templates', function () {
	return gulp.src(paths.templates)
		.pipe(html2js())
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
	return gulp.src(paths.scripts)
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
	gulp.watch(paths.templates, ['templates']);
	gulp.watch(paths.scripts, ['scripts']);
});
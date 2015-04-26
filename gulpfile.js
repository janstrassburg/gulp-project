var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var template = require('gulp-html-compile');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var uncache = require('gulp-uncache');

var paths = {
	templates: [
		'src/views/**/*.html'
	],
	scripts: [
		'dist/templates.js',
		'src/js/**/*.js'
	],
	styles: 'src/css/**/*.css'
};

gulp.task('templates', function () {
	return gulp.src(paths.templates)
		.pipe(minifyHTML())
		.pipe(template({
			name: function (file) {
				return file.relative.split('.')[0];
			}
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('scripts', ['templates', 'index'], function () {
	return gulp.src(paths.scripts)
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('styles', ['index'], function () {
	return gulp.src(paths.styles)
		.pipe(concat('all.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('dist'));
});

gulp.task('index', function () {
	return gulp.src('src/index.html')
		.pipe(uncache())
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
	gulp.watch(paths.templates, ['scripts']);
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch('src/index.html', ['index']);
});

gulp.task('default', ['scripts', 'styles']);
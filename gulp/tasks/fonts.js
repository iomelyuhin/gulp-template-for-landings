const gulp = require('gulp')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')

module.exports = function fonts() {
	return gulp.src('src/assets/fonts/*.ttf')
		.pipe(ttf2woff())
    .pipe(gulp.dest('build/assets/fonts'))
    .pipe(gulp.src('src/assets/fonts/*.ttf'))
		.pipe(ttf2woff2())
    .pipe(gulp.dest('build/assets/fonts'))
}



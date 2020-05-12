const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

module.exports = function images() {
  return gulp
    .src("src/assets/img/content/*.{gif,png,jpg,svg,ico,webp}")
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({
          quality: 75,
          progressive: true,
        }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest("build/assets/img/content/"))
    .pipe(gulp.src("src/assets/img/content/*.{gif,png,jpg,svg,ico,webp}"))
    .pipe(gulp.dest("build/assets/img/content/"));
};

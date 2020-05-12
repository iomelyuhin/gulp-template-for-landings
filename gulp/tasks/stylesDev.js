const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const shorthand = require("gulp-shorthand");
const autoprefixer = require("gulp-autoprefixer");
var pxtorem = require("gulp-pxtorem");
const sassGlob = require("gulp-sass-glob");
const webpcss = require("gulp-webpcss");

module.exports = function styles() {
  return gulp
    .src("src/assets/styles/style.scss")
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(
      pxtorem({
        propList: ["*", "!*border*"],
        selectorBlackList: [/^html$/],
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(webpcss())
    .pipe(gulp.dest("build/assets/css"));
};

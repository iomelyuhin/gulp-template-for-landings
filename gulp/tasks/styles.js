const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const shorthand = require("gulp-shorthand");
const autoprefixer = require("gulp-autoprefixer");
const gulpStylelint = require("gulp-stylelint");
var pxtorem = require("gulp-pxtorem");
const sassGlob = require("gulp-sass-glob");
const rename = require("gulp-rename");
const webpcss = require("gulp-webpcss");
const group_media = require("gulp-group-css-media-queries");


module.exports = function styles() {
  return gulp
    .src("src/assets/styles/style.scss")
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      gulpStylelint({
        failAfterError: false,
        reporters: [
          {
            formatter: "string",
            console: true,
          },
        ],
      })
    )
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
    .pipe(
      group_media()
		)
		
    .pipe(webpcss({webpClass: '.webp',noWebpClass: '.no-webp'}))
    .pipe(gulp.dest("build/assets/css"))
    .pipe(shorthand())
    .pipe(
      cleanCSS(
        {
          debug: true,
          compatibility: "*",
        },
        (details) => {
          console.log(
            `${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`
          );
        }
      )
    )
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest("build/assets/css"));
};

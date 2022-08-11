const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const clean_css = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const del = require('del');

//Пути к файлам
const paths = {
  styles: {
    src: "src/styles/**/*.scss",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js/",
  },
};

function clean(){
  return del(['del/*'])
}
//Перевод scss файла в css  и переименование его с дополнительным суфиксом .min
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(clean_css())
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}
//Работа с js файлами
function scripts() {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: true,
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
}
//Отслеживание функции function styles()
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series(gulp.parallel(styles, scripts), watch);

exports.clean = clean; 
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.default = build;
exports.build = build;

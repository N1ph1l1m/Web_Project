const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const clean_css = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
//const imagemin = require("gulp-imagemin");
const del = require('del');


//Пути к файлам
const paths = {
  stylesNull: {
    src: "src/styles/**/styleNull.scss",
    dest: "dist/css/",
  },
  styles: {
    src: "src/styles/**/style.scss",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js/",
  },
  images:{
src: 'src/img/*',
dest: 'dist/img',
  },
};

function clean(){
  return del(['del/*'])
}
//Перевод scss файла в css  и переименование его с дополнительным суфиксом .min
function stylesNull() 
{
  return gulp
    .src(paths.stylesNull.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(clean_css({
      level:2
    }))
    .pipe(
      rename({
        basename: "StyleNull",
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.stylesNull.dest));
}
function styles() 
{
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(clean_css({
      level:2
    }))
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
}
//Работа с js файлами
function scripts() {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: true,
    })
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
}
/*function img(){
  return gulp.src(paths.images.src)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dest))
}*/
//Отслеживание функции function styles()
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  //gulp.watch(paths.images.src, img);
}

const build = gulp.series(clean,gulp.parallel(stylesNull,styles, scripts,/*img */), watch);


exports.clean = clean; 
exports.stylesNull = stylesNull;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
//exports.img = img; 
exports.default = build;
exports.build = build;

"use strict";

// plug-in
const gulp = require("gulp");
const sass = require("gulp-dart-sass");


// path
const pathSrc = {
  root: "./",
  scss: "./build/scss/**/*.scss",
};
const pathDist = {
  root: "./build",
  css: "./build/css/",
};


// sass
gulp.task("sass", () => {
  return gulp.src(pathSrc.scss)
  .pipe(sass().on("error", sass.logError))
  .pipe(gulp.dest(pathDist.css))
});


// gulp start
gulp.task("default", gulp.series("sass"));
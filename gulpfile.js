// gulpプラグインの読み込み
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const browserify = require('gulp-browserify');
const vueify = require('vueify');
const nodemon = require('gulp-nodemon');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

gulp.task('saas', (callback) => {
    gulp.src('src/stylesheets/style.sass')
        .pipe(sass())
        .pipe(gulp.dest('public/stylesheets'));
    gulp.src('src/stylesheets/paper.css')
        .pipe(gulp.dest('public/stylesheets'));
    callback();
});

gulp.task('images', (callback) => {
    gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('public/images'));
    callback();
});

gulp.task('build', (callback) => {
    gulp.src('./src/views/*.ejs')
        .pipe(gulp.dest('./public'));
    gulp.src('./src/javascripts/*.js')
        .pipe(gulp.dest('./public/javascripts'));
    callback();
});

gulp.task('watch', (callback) => {
    gulp.watch('./src/routes/*.*', gulp.task('build'));
    gulp.watch('./src/views/*.*', gulp.task('build'));
    gulp.watch('./src/stylesheets/*.sass', gulp.task('sass'));
    gulp.watch('./public/**/*.*').on('change', browserSync.reload);
    callback();
});

// start express using nodemon with autoreload
gulp.task('nodemon', function () {
    nodemon({
        script: 'bin/www'
        , ext: 'js'
    })
})

gulp.task('browser-sync-express', gulp.series('saas', 'images', 'build', 'watch', 'nodemon'), function() {
    browserSync.init({
        proxy: "localhost:9090"
    });
});

gulp.task('default', gulp.series('browser-sync-express'));


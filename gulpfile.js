// gulpプラグインの読み込み
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const browserify = require('gulp-browserify');
const vueify = require('vueify');
const nodemon = require('gulp-nodemon');

gulp.task('saas', function () {
    return gulp.src('public/stylesheets/style.sass')
        .pipe(sass())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('build', (callback) => {
    gulp.src('./views/*.ejs')
        .pipe(gulp.dest('./public'));
    callback();
});

gulp.task('watch', (callback) => {
    gulp.watch('./routes/**/*.*', gulp.task('build'));
    gulp.watch('./views/**/*.*', gulp.task('build'));
    gulp.watch('./public/stylesheets/*.sass', gulp.task('sass'));
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

gulp.task('browser-sync-express', gulp.series('saas', 'build', 'watch', 'nodemon'), function() {
    browserSync.init({
        proxy: "localhost:9090"
    });
});

gulp.task('default', gulp.series('browser-sync-express'));


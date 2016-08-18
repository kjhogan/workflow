var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    compass = require('gulp-compass');

var coffeeSource = ['components/coffee/tagline.coffee']

var jsSource = ['components/scripts/rclick.js',
               'components/scripts/pixgrid.js',
                'components/scripts/tagline.js',
               'components/scripts/template.js']

var sassSource = ['components/sass/style.scss']

gulp.task('coffee', function() {
    gulp.src(coffeeSource)
        .pipe(coffee({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function() {
    gulp.src(jsSource)
        .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
    gulp.src(sassSource)
        .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/images',
            style: 'expanded'
        })
        .on('error', gutil.log))
        .pipe(gulp.dest('builds/development/css'))
});

gulp.task('watch', function() {
    gulp.watch(coffeeSource, ['coffee']);
    gulp.watch(jsSource, ['js']);
    gulp.watch('components/sass/*scss', ['compass']);
});

gulp.task('default', ['coffee', 'js', 'compass', 'watch', 'connect']);

gulp.task('connect', function(){
    connect.server({
        root: 'builds/development',
        livereload: true
    })
});
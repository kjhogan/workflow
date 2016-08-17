var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-broswerify');

var coffeeSource = ['components/coffee/tagline.coffee']

var jsSource = ['components/scripts/rclick.js',
               'components/scripts/pixgrid.js',
               'components/scripts/template.js',
               'components/scripts/tagline.js']

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
});
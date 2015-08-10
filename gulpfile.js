var gulp = require('gulp')

var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var browserify = require('browserify');
var vinylSource = require('vinyl-source-stream');

var distRoot = 'dist'

gulp.task('copyHtml', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest(distRoot));
});

gulp.task('copyCSS', function() {
    gulp.src('src/main.css')
        .pipe(gulp.dest(distRoot));
});

gulp.task('copyData', function() {
    gulp.src('src/example-response.json')
        .pipe(gulp.dest(distRoot));
});

gulp.task('connect', function() {
    connect.server({
        root: distRoot,
        port: 4000
    });
});

gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distRoot));
});

gulp.task('browserify', function() {
    return browserify('./src/app.js')
        .bundle()
        .pipe(vinylSource('all.js'))
        .pipe(gulp.dest(distRoot));
});


gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['browserify']);
});

gulp.task('default', ['copyHtml', 'copyCSS', 'copyData', 'browserify', 'connect', 'watch']);



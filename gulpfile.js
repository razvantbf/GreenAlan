var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    connect = require('gulp-connect');

// ============
// code sources
// ============

jsSources = ['components/scripts/*.js'];
sassMain = ['components/sass/styles.scss'];
sassSources = ['components/sass/*.scss'];
htmlSources = ['build/*.html'];

// ============
// gulp tasks
// ============

gulp.task('webserver', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('javascript', function() {
    gulp.src(jsSources)
        .pipe(concat('custom.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(connect.reload());
});

gulp.task('sass', function() {
    gulp.src(sassMain)
        .pipe(sass({style: 'expanded'}).on('error', gutil.log))
        .pipe(prefix("last 3 versions", "ie 8", "ie 9"))
        //.pipe(minify())
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(sassSources, ['sass']);
	gulp.watch(jsSources, ['javascript']);
	gulp.watch(htmlSources, ['html']);
});

gulp.task('default', ['webserver', 'watch', 'html', 'javascript', 'sass']);

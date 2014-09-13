var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    msbuild = require('gulp-msbuild');

gulp.task('build', function() {
    return gulp.src('./netlib/LibGit2SharpInvoke.sln')
        .pipe(msbuild({
            errorOnFail: true,
            properties: { Configuration: 'Debug' }
        }));
});

gulp.task('test', ['build'], function() {
    return gulp.src('./test/*.js', {read: false})
        .pipe(mocha());
});

gulp.task('default', ['test']);

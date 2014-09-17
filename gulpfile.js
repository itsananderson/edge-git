var fs = require('fs'),
    path = require('path'),
    request = require('request'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    msbuild = require('gulp-msbuild'),
    shelljs = require('shelljs');

var nugetPath = path.join(__dirname, 'netlib', 'nuget.exe');

gulp.task('download-nuget', function(cb) {
    fs.exists(nugetPath, function(exists) {
        if (exists) {
            return cb();
        }
        request('http://nuget.org/nuget.exe')
            .on('end', cb)
            .pipe(fs.createWriteStream(nugetPath));
    });
});

gulp.task('package-restore', ['download-nuget'], function(cb) {
    shelljs.exec(nugetPath + ' restore ./netlib/LibGit2SharpInvoke.sln', cb);
});

gulp.task('build', ['package-restore'], function() {
    return gulp.src('./netlib/LibGit2SharpInvoke.sln')
        .pipe(msbuild({
            errorOnFail: true,
            properties: { Configuration: 'Release' }
        }));
});

gulp.task('test', ['build'], function() {
    return gulp.src('./test/*.js', {read: false})
        .pipe(mocha());
});

gulp.task('default', ['test']);

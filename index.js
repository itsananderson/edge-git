var repository = require('./lib/repository'),
    repo = require('./lib/repo'),
    path = require('path'),
    rimraf = require('rimraf');

repository.init('./test', function(err, repo) {
    if (err) throw err;
    console.log(repo);
    repo.branches(function(err, branches) {
        if (err) throw err;
        console.log(branches);
    });
    repo.version(function(err, version) {
        if (err) throw err;
        console.log(version);
    });
});

repository.init('./test2', function(err, repo) {
    if (err) throw err;
    console.log(repo);
    repo.branches(function(err, branches) {
        if (err) throw err;
        console.log(branches);
    });
});

rimraf.sync(path.join(__dirname, 'test3'));
repository.clone('https://github.com/itsananderson/node-web-server-cli.git', './test3', function(err, repo) {
    if (err) throw err;
    console.log(repo);
});

var r = repo({path:"./test3"}, true);
var result = r.branches(null, true);
console.log(result);
/*
function(err, result) {
    if (err) throw err;
    result(null, function(err, result) {
        if (err) throw err;
        console.log(result);
    });
});
*/

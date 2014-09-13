var repository = require('./lib/repository'),
    repo = require('./lib/repo'),
    path = require('path'),
    rimraf = require('rimraf');

repository.init('./repos/test1', function(err, repo) {
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

repository.init('./repos/test2', function(err, repo) {
    if (err) throw err;
    console.log(repo);
    repo.branches(function(err, branches) {
        if (err) throw err;
        console.log(branches);
    });
});

rimraf.sync(path.join(__dirname, 'repos', 'test3'));
repository.clone('https://github.com/itsananderson/node-web-server-cli.git', './repos/test3', function(err, repo) {
    if (err) throw err;
    console.log(repo);
});

var r = repo({path:"./repos/test3"}, true);
var result = r.branches(null, true);
console.log(result);

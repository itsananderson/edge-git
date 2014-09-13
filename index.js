var repository = require('./lib/repository'),
    repo = require('./lib/repo')(null, true),
    path = require('path'),
    rimraf = require('rimraf');

var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2');
rimraf.sync(repoDir);
repo.Clone({url:'https://github.com/itsananderson/node-web-server-cli.git', path:repoDir}, function(err, repoPath) {
    if (err) throw err;

    var r = repo.Constructor(repoPath, true);
    var result = r.branches(null, true);
    console.log(result);
});


var repo = require('./lib/repository')(null, true),
    path = require('path'),
    rimraf = require('rimraf');

var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2');
rimraf.sync(repoDir);
repo.Clone({url:'https://github.com/itsananderson/node-web-server-cli.git', path:repoDir}, function(err, repoPath) {
    if (err) throw err;

    var r = repo.Constructor(repoPath, true);
    var result = r.Branches(null, true);
    console.log(result);
    console.log(r.Lookup('master', true));
});


var repository = require('./lib/repository'),
    repo = require('./lib/repo')(null, true),
    path = require('path'),
    rimraf = require('rimraf');

var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2');
rimraf.sync(repoDir);
repository.clone('https://github.com/itsananderson/node-web-server-cli.git', repoDir, function(err) {
    if (err) throw err;

    var r = repo.Constructor(repoDir, true);
    var result = r.branches(null, true);
    console.log(result);
});


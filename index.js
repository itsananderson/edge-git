var repository = require('./lib/repository'),
    repo = require('./lib/repo'),
    path = require('path'),
    rimraf = require('rimraf');

var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2');
rimraf.sync(repoDir);
repository.clone('https://github.com/itsananderson/node-web-server-cli.git', repoDir, function(err) {
    if (err) throw err;

    var r = repo({path:repoDir}, true);
    var result = r.branches(null, true);
    console.log(result);
});


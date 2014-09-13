var path = require('path'),
    edge = require('edge');

var libgit2path = path.join(path.dirname(__dirname), 'netlib/LibGit2Sharp.0.19.0.0/lib/net40/LibGit2Sharp.dll');

module.exports = edge.func({source: path.join(__dirname, 'repository.cs'), references: [libgit2path]});

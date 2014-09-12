var fs = require('fs'),
    path = require('path'),
    edge = require('edge');

var cs = fs.readFileSync(path.join(__dirname, 'repository.cs')).toString("utf8");

cs = cs.replace(/\{libgit2sharp_path\}/g, path.join(path.dirname(__dirname), 'netlib/LibGit2Sharp.0.19.0.0/lib/net40/LibGit2Sharp.dll'));

module.exports = edge.func(cs);

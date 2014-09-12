var fs = require('fs'),
    path = require('path'),
    edge = require('edge');

var cs = fs.readFileSync(path.join(__dirname, 'repo.cs')).toString("utf8");

var libgit2path = path.join(path.dirname(__dirname), 'netlib/LibGit2Sharp.0.19.0.0/lib/net40/LibGit2Sharp.dll');

cs = cs.replace(/\{libgit2sharp_path\}/g, libgit2path);

module.exports = edge.func({source: cs, references: [libgit2path]});

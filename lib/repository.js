var path = require('path'),
    edge = require('edge');

var libgit2path = path.join(path.dirname(__dirname), 'netlib/LibGit2SharpInvoke/LibGit2SharpInvoke/bin/Debug/LibGit2SharpInvoke.dll');

module.exports = edge.func({
    assemblyFile: libgit2path,
    typeName: 'LibGit2SharpInvoke.Startup',
    methodName: 'Invoke'
})('Repository', true);

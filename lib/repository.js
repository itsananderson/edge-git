var path = require('path'),
    edge = require('edge');

var libGit2SharpInvokePath = path.join(path.dirname(__dirname), 'netlib/LibGit2SharpInvoke/bin/Debug/LibGit2SharpInvoke.dll');

module.exports = edge.func({
    assemblyFile: libGit2SharpInvokePath,
    typeName: 'LibGit2SharpInvoke.Startup',
    methodName: 'Invoke'
})('Repository', true);

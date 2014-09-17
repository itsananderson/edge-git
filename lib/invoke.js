var fs = require('fs'),
    path = require('path'),
    edge = require('edge');

var libGit2SharpInvokePath = path.join(path.dirname(__dirname), 'netlib/LibGit2SharpInvoke/bin/Release/LibGit2SharpInvoke.dll');

module.exports = edge.func({
    assemblyFile: libGit2SharpInvokePath
});


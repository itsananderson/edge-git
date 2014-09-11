var edge = require('edge');

var myFunction = edge.func(function() {/*
    #r "netlib/LibGit2Sharp.0.19.0.0/lib/net40/LibGit2Sharp.dll"

    using LibGit2Sharp;

    async (path) => {
        return Repository.Init(path.ToString());
    }
*/});

myFunction('./test', function(err, result) {
    if (err) throw err;
    console.log(result);
});
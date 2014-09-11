var edge = require('edge');

function Repository(path) {
    this.path = path;
}

Repository.prototype.branches = function branches(cb) {
    invoke({
        target: 'branches',
        args: [this.path]
    }, cb);
};

var invoke = edge.func(function Init() {/*
    #r "netlib/LibGit2Sharp.0.19.0.0/lib/net40/LibGit2Sharp.dll"

    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using LibGit2Sharp;

    public class Startup {
        public async Task<object> Invoke(dynamic input) {
            var target = input.target.ToString();

            var path = input.args[0].ToString();

            if ("init" == target) {
                var initPath = Repository.Init(path);
                return initPath;
            }

            using (var repo = new Repository(path)) {
                if ("branches" == target) {
                    return repo.Branches.Select(b => b.Name).ToArray();
                }
            }

            return null;
        }
    }
*/});

function init(path, cb) {
    invoke({
        target: 'init',
        args: [path]
    }, function(err, path) {
        if (err) return cb(err);
        cb(null, new Repository(path));
    });
}

init('./test', function(err, repo) {
    if (err) throw err;
    console.log(repo);
    repo.branches(function(err, branches) {
        if (err) throw err;
        console.log(branches);
    });
});

init('./test2', function(err, repo) {
    if (err) throw err;
    console.log(repo);
    repo.branches(function(err, branches) {
        if (err) throw err;
        console.log(branches);
    });
});

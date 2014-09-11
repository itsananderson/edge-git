var edge = require('edge');

var init = edge.func(function Init() {/*
    #r "netlib/LibGit2Sharp.0.19.0.0/lib/net40/LibGit2Sharp.dll"

    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using LibGit2Sharp;

    public class Startup {
        private static Dictionary<string, string> repositories = new Dictionary<string, string>();

        public async Task<object> Invoke(object input) {
            var path = input.ToString();
            var initPath = Repository.Init(path);
            using (var repo = new Repository(initPath)) {
                var id = Guid.NewGuid().ToString();
                repositories.Add(id, repo.Info.Path);
                return id;
            }
        }
    }
*/});

init('./test', function(err, result) {
    if (err) throw err;
    console.log(result);
});

init('./test2', function(err, result) {
    if (err) throw err;
    console.log(result);
});

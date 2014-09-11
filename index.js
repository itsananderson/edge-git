var edge = require('edge');

var init = edge.func(function Init() {/*
    #r "netlib/LibGit2Sharp.0.19.0.0/lib/net40/LibGit2Sharp.dll"

    using System;
    using System.Threading.Tasks;
    using LibGit2Sharp;

    public class Startup {
        public async Task<object> Invoke(object input) {
            var path = input.ToString();
            var initPath = Repository.Init(path);
            Console.WriteLine(initPath);
            using (var repo = new Repository(initPath)) {
                return repo.Info.Path;
            }
        }
    }
*/});

init('./test', function(err, result) {
    if (err) throw err;
    console.log(result);
});
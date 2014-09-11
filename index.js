var edge = require('edge');

function Repository(path) {
    this.path = path;
}

Repository.prototype.branches = function branches(cb) {
    invoke({
        target: 'EnumerableProperty',
        property: 'Branches',
        select: 'Name',
        path: this.path
    }, cb);
};

Repository.prototype.version = function version(cb) {
    invoke({
        target: 'Property',
        property: 'Version',
        select: '',
        path: this.path
    }, cb);
};

var invoke = edge.func(function Init() {/*
    #r "netlib/LibGit2Sharp.0.19.0.0/lib/net40/LibGit2Sharp.dll"

    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Reflection;
    using LibGit2Sharp;

    public class Startup {
        public async Task<object> Invoke(dynamic input) {
            var target = input.target.ToString();
            var path = input.path.ToString();

            if ("Init" == target) {
                var initPath = Repository.Init(path);
                return initPath;
            }

            using (var repo = new Repository(path)) {
                if ("Property" == target) {
                    var propertyName = input.property.ToString();
                    var select = input.select.ToString();
                    Type t = repo.GetType();
                    PropertyInfo p = t.GetProperty(propertyName);
                    dynamic v = p.GetValue(repo, null);
                    if (select.Length > 0) {
                        return v.GetType().GetProperty(select).GetValue(v, null);
                    } else {
                        return v;
                    }
                }

                if ("EnumerableProperty" == target) {
                    var propertyName = input.property.ToString();
                    var select = input.select.ToString();
                    Type t = repo.GetType();
                    PropertyInfo p = t.GetProperty(propertyName);
                    dynamic v = p.GetValue(repo, null);

                    var list = new List<object>();
                    foreach (var i in v) {
                        list.Add(i.GetType().GetProperty(select).GetValue(i, null));
                    }
                    return list;
                }
            }

            return null;
        }
    }
*/});

function init(path, cb) {
    invoke({
        target: 'Init',
        path: path
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
    repo.version(function(err, version) {
        if (err) throw err;
        console.log(version);
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

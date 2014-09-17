var path = require('path'),
    Branch = require('./branch');

var csharpRepository = require('./invoke')('Repository', true);

function Repository(path) {
    var self = this;
    self.repo = csharpRepository.Constructor(path, true);

    self.Head = function(cb) {
        self.repo.Head(null, function(head) {
            cb(null, new Branch(head));
        });
    };
    self.HeadSync = function() {
        return new Branch(self.repo.Head(null, true));
    };

    self.Lookup = function(name, cb) {
        self.repo.Lookup(name, cb);
    };
    self.LookupSync = function(name) {
        return self.repo.Lookup(name, true);
    };

    self.Branches = function(cb) {
        self.repo.Branches(null, function(branches) {
            cb(null, branches.map(function(b) {
                return new Branch(b);
            }))
        });
    };
    self.BranchesSync = function() {
        return self.repo.Branches(null, true).map(function(b) {
            return new Branch(b);
        });
    };

    Object.keys(self.repo).forEach(function(key) {
        if (!self[key]) {
            self[key] = function(cb) { self.repo[key](null, cb) };
            self[key + 'Sync'] = function() { return self.repo[key](null, true) };
        }
    });
}

Repository.Init = function Init(path, cb) {
    csharpRepository.Init(path, cb);
};

Repository.InitSync = function InitSync(path) {
    return csharpRepository.Init(path, true);
};

Repository.Clone = function Clone(path, cb) {
    csharpRepository.Clone(path, cb);
};

Repository.CloneSync = function Clone(path) {
    return csharpRepository.Clone(path, true);
};

module.exports = Repository;

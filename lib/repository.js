var Branch = require('./branch'),
    Network = require('./network');

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

    self.Network = function(cb) {
        self.repo.Network(null, function(network) {
            cb(null, new Network(network));
        });
    };
    self.NetworkSync = function() {
        return new Network(self.repo.Network(null, true));
    };

    self.Reset = function(mode, committish, cb) {
        self.repo.Reset({mode: mode, committish: committish}, cb);
    };

    self.ResetSync = function(mode, committish) {
        return self.repo.Reset({mode: mode, committish: committish}, true);
    };

    self.Checkout = function(branch, cb) {
        return self.repo.Checkout(branch, cb);
    };

    self.CheckoutSync = function(branch) {
        return self.repo.Checkout(branch, true);
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

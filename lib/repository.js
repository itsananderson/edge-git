var Branch = require('./branch'),
    Network = require('./network');

var csharpRepository = require('./invoke')('Repository', true);

function Repository(path) {
    var self = this;

    self.repo = csharpRepository.Constructor(path, true);

    Object.keys(self.repo).forEach(function(key) {
        if (!self[key]) {
            self[key] = function(cb) { self.repo[key](null, cb) };
            self[key + 'Sync'] = function() { return self.repo[key](null, true) };
        }
    });
}

Repository.prototype.Head = function(cb) {
    this.repo.Head(null, function(head) {
        cb(null, new Branch(head));
    });
};
Repository.prototype.HeadSync = function() {
    return new Branch(this.repo.Head(null, true));
};

Repository.prototype.Lookup = function(name, cb) {
    this.repo.Lookup(name, cb);
};
Repository.prototype.LookupSync = function(name) {
    return this.repo.Lookup(name, true);
};

Repository.prototype.Branches = function(cb) {
    this.repo.Branches(null, function(branches) {
        cb(null, branches.map(function(b) {
            return new Branch(b);
        }))
    });
};
Repository.prototype.BranchesSync = function() {
    return this.repo.Branches(null, true).map(function(b) {
        return new Branch(b);
    });
};

Repository.prototype.Network = function(cb) {
    this.repo.Network(null, function(network) {
        cb(null, new Network(network));
    });
};
Repository.prototype.NetworkSync = function() {
    return new Network(this.repo.Network(null, true));
};

Repository.prototype.Reset = function(mode, committish, cb) {
    this.repo.Reset({mode: mode, committish: committish}, cb);
};

Repository.prototype.ResetSync = function(mode, committish) {
    return this.repo.Reset({mode: mode, committish: committish}, true);
};

Repository.prototype.Checkout = function(branch, cb) {
    return this.repo.Checkout(branch, cb);
};

Repository.prototype.CheckoutSync = function(branch) {
    return this.repo.Checkout(branch, true);
};

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

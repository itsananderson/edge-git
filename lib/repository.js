var _ = require('lodash'),
    mixin = require('utils-merge'),
    wrapperBase = require('./wrapper-base'),
    Branch = require('./branch'),
    Network = require('./network');

var csharpRepository = require('./invoke')('Repository', true);

function Repository(path) {
    this.repo = csharpRepository.Constructor(path, true);
    this.addDirectCalls(this, this.repo);
}

mixin(Repository.prototype, wrapperBase);

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
        var branchNames = Object.keys(branches);
        cb(null, _.zipObject(branchNames, branchNames.map(function(branchName) {
            return new Branch(branches[branchName]);
        })));
    });
};
Repository.prototype.BranchesSync = function() {
    var branches = this.repo.Branches(null, true);
    var branchNames = Object.keys(branches);
    return _.zipObject(branchNames, branchNames.map(function(branchName) {
        return new Branch(branches[branchName]);
    }));
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

Repository.Clone = function Clone(url, path, options, cb) {
    if (typeof options === 'function') {
        cb = options;
        options = {};
    }

    options = mixin({
        bare: false,
        checkout: true,
        credentials: null
    }, options);

    csharpRepository.Clone({url: url, path: path, options: options}, cb);
};

Repository.CloneSync = function Clone(url, path, options) {
    if (typeof options === 'function') {
        cb = options;
        options = {};
    }

    options = mixin({
        bare: false,
        checkout: true,
        credentials: null
    }, options);

    return csharpRepository.Clone({url: url, path: path, options: options}, true);
};

module.exports = Repository;

var path = require('path'),
    edge = require('edge');

var csharpRepository = require('./invoke')('Repository', true);

function Repository(path) {
    this.repo = csharpRepository.Constructor(path, true);

    this.Lookup = function(name, cb) {
        this.repo.Lookup(name, cb);
    };
    this.LookupSync = function(name) {
        return this.repo.Lookup(name, true);
    };

    Object.keys(this.repo).forEach(function(key) {
        if (!this[key]) {
            this[key] = function(cb) { this.repo[key](null, cb) };
            this[key + 'Sync'] = function() { return this.repo[key](null, true) };
        }
    }.bind(this));
}

Repository.Init = function Init(path, cb) {
    csharpRepository.Init(path, cb);
}

Repository.InitSync = function InitSync(path) {
    return csharpRepository.Init(path, true);
}

Repository.Clone = function Clone(path, cb) {
    csharpRepository.Clone(path, cb);
}

Repository.CloneSync = function Clone(path) {
    return csharpRepository.Clone(path, true);
}

module.exports = Repository;

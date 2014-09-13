var path = require('path'),
    edge = require('edge');

var csharpRepository = require('./invoke')('Repository', true);

function Repository(path) {
    var self = this;
    self.repo = csharpRepository.Constructor(path, true);

    self.Lookup = function(name, cb) {
        self.repo.Lookup(name, cb);
    };
    self.LookupSync = function(name) {
        return self.repo.Lookup(name, true);
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

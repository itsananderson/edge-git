var mixin = require('utils-merge'),
    wrapperBase = require('./wrapper-base');

function Network(network) {
    this.network = network;
    this.addDirectCalls(this, network);
}

mixin(Network.prototype, wrapperBase);

Network.prototype.Pull = function(remote, objectish, signature, options, cb) {
    this.network.Pull({
        remote: remote,
        objectish: objectish,
        signature: signature,
        options: options
    }, cb);
};

Network.prototype.PullSync = function(remote, objectish, signature, options) {
    return this.network.Pull({
        remote: remote,
        objectish: objectish,
        signature: signature,
        options: options
    }, true);
};

Network.prototype.Fetch = function(remote, options, cb) {
    return this.network.Fetch({
        remote: remote,
        options: options
    }, cb);
};

Network.prototype.FetchSync = function(remote, options) {
    return this.network.Fetch({
        remote: remote,
        options: options
    }, true);
};

Network.prototype.AddRemote = function(name, url, cb) {
    this.network.AddRemote({name: name, url: url}, cb);
};

Network.prototype.AddRemoteSync = function(name, url) {
    return this.network.AddRemote({name: name, url: url}, true);
};

Network.prototype.RemoveRemote = function(name, cb) {
    this.network.RemoveRemote(name, cb);
};

Network.prototype.RemoveRemoteSync = function(name) {
    return this.network.RemoveRemote(name, true);
};

module.exports = Network;

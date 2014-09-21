function Network(network) {
    var self = this;

    self.network = network;

    Object.keys(self.network).forEach(function(key) {
        if (!self[key]) {
            if (typeof self.network[key] === 'function') {
                self[key] = function(cb) { self.network[key](null, cb) };
                self[key + 'Sync'] = function() { return self.network[key](null, true) };
            } else {
                self[key] = self.network[key];
            }
        }
    });
}

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

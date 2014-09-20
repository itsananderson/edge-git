function Network(network) {
    var self = this;

    self.network = network;

    self.Pull = function(remote, objectish, signature, options, cb) {
        self.network.Pull({
            remote: remote,
            objectish: objectish,
            signature: signature,
            options: options
        }, cb);
    };

    self.PullSync = function(remote, objectish, signature, options) {
        return self.network.Pull({
            remote: remote,
            objectish: objectish,
            signature: signature,
            options: options
        }, true);
    };

    self.Fetch = function(remote, options, cb) {
        return self.network.Fetch({
            remote: remote,
            options: options
        }, cb);
    };

    self.FetchSync = function(remote, options) {
        return self.network.Fetch({
            remote: remote,
            options: options
        }, true);
    };

    self.AddRemote = function(name, url, cb) {
        self.network.AddRemote({name: name, url: url}, cb);
    };

    self.AddRemoteSync = function(name, url) {
        return self.network.AddRemote({name: name, url: url}, true);
    };

    self.RemoveRemote = function(name, cb) {
        self.network.RemoveRemote(name, cb);
    };

    self.RemoveRemoteSync = function(name) {
        return self.network.RemoveRemote(name, true);
    };

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

module.exports = Network;

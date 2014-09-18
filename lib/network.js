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

function Branch(branch) {
    var self = this;

    self.branch = branch;

    Object.keys(self.branch).forEach(function(key) {
        if (!self[key]) {
            if (typeof self.branch[key] === 'function') {
                self[key] = function(cb) { self.branch[key](null, cb) };
                self[key + 'Sync'] = function() { return self.branch[key](null, true) };
            } else {
                self[key] = self.branch[key];
            }
        }
    });
}

module.exports = Branch;

function Branch(branch) {
    var self = this;

    self.branch = branch;

    Object.keys(self.branch).forEach(function(key) {
        if (!self[key]) {
            self[key] = function(cb) { self.branch[key](null, cb) };
            self[key + 'Sync'] = function() { return self.branch[key](null, true) };
        }
    });
}

module.exports = Branch;
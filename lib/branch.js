var mixin = require('utils-merge'),
    wrapperBase = require('./wrapper-base');

function Branch(branch) {
    this.branch = branch;
    this.addDirectCalls(this, branch);
}

Branch.prototype.Commits = function(after, cb) {
    if (typeof after === 'function') {
        cb = after;
        after = undefined;
    }

    this.branch.Commits(after, cb);
};

Branch.prototype.CommitsSync = function(after) {
    return this.branch.Commits(after, true);
};

mixin(Branch.prototype, wrapperBase);

module.exports = Branch;

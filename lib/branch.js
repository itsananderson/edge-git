var mixin = require('utils-merge'),
    wrapperBase = require('./wrapper-base');

function Branch(branch) {
    this.branch = branch;
    this.addDirectCalls(this, branch);
}

mixin(Branch.prototype, wrapperBase);

module.exports = Branch;

var invoke = require('./invoke');

function Repository(path) {
    this.path = path;
}

Repository.init = function init(path, cb) {
    invoke({
        target: 'StaticMethod',
        className: 'LibGit2Sharp.Repository',
        method: 'Init',
        path: path,
        args: [path, false],
        argTypes: ['System.String', 'System.Boolean']
    }, function(err, path) {
        if (err) return cb(err);
        cb(null, new Repository(path));
    });
};

Repository.clone = function clone(url, path, cb) {
    invoke({
        target: 'StaticMethod',
        className: 'LibGit2Sharp.Repository',
        method: 'Clone',
        path: path,
        args: [url, path, null]
    }, function(err, path) {
        if (err) return cb(err);
        cb(null, new Repository(path));
    });
};

Repository.prototype.branches = function branches(cb) {
    invoke({
        target: 'EnumerableProperty',
        property: 'Branches',
        select: 'Name',
        path: this.path
    }, cb);
};

Repository.prototype.version = function version(cb) {
    invoke({
        target: 'Property',
        property: 'Version',
        select: '',
        path: this.path
    }, cb);
};

module.exports = Repository;
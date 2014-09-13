var assert = require('assert'),
    path = require('path'),
    rimraf = require('rimraf'),
    repository = require('../lib/repository');

describe('repository', function() {
    it('can be initialized', function(done) {
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test1');
        repository.Init(repoDir, function(err, repoPath) {
            if (err) throw err;
            assert.equal(repoPath, path.join(repoDir, '.git/'));
            done();
        });
    });

    it('can clone', function(done) {
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2');
        rimraf.sync(repoDir);
        repository.Clone({url:'https://github.com/itsananderson/node-web-server-cli.git', path:repoDir}, function(err, repoPath) {
            if (err) throw err;

            assert.equal(repoPath, path.join(repoDir, '.git/'));

            var repo = repository.Constructor(repoPath, true);
            var branches = repo.Branches(null, true);
            assert.equal(branches[0].Name(null, true), 'master');

            var tip = branches[0].Tip(null, true);
            var name = branches[0].Name(null, true);
            var branchHead = repo.Lookup(name, true);
            assert.deepEqual(tip, branchHead);

            done();
        });
    });
});
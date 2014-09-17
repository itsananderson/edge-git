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

            var repo = new repository(repoPath);
            var branches = repo.BranchesSync();
            assert.equal(branches[0].NameSync(), 'master');

            var tip = branches[0].TipSync();
            var name = branches[0].NameSync();
            var branchHead = repo.LookupSync(name);

            assert.deepEqual(tip, branchHead);

            done();
        });
    });

    it('can list commits', function(done) {
        this.timeout(20000);
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2', '.git');
        var repo = new repository(repoDir);
        var branches = repo.BranchesSync();
        assert.equal(2, branches.length);

        branches.forEach(function(branch) {
            assert.equal(49, branch.CommitsSync().length);
        });

        done();
    });
});

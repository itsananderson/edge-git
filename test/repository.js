var assert = require('assert'),
    path = require('path'),
    rimraf = require('rimraf'),
    repository = require('../lib/repository');

describe('repository', function() {
    it('can be initialized', function(done) {
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test1');
        repository.init(repoDir, function(err, repo) {
            if (err) throw err;
            assert.equal(repo.path, path.join(repoDir, '.git/'));
            done();
        });
    });

    it('can clone', function(done) {
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2');
        rimraf.sync(repoDir);
        repository.clone('https://github.com/itsananderson/node-web-server-cli.git', repoDir, function(err, repo) {
            if (err) throw err;
            assert.equal(repo.path, path.join(repoDir, '.git/'));
            done();
        });
    });
});
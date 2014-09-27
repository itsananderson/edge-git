var _ = require('lodash'),
    assert = require('assert'),
    path = require('path'),
    rimraf = require('rimraf'),
    repository = require('../lib/repository');

describe('repository', function() {
    it('can be initialized', function(done) {
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test1');
        rimraf.sync(repoDir);
        repository.Init(repoDir, function(err, repoPath) {
            if (err) throw err;
            assert.equal(repoPath, path.join(repoDir, '.git/'));
            done();
        });
    });

    if (!process.env.NO_NETWORK) {
        it('can clone from url', function (done) {
            this.timeout(5000);
            var repoDir = path.join(path.dirname(__dirname), 'repos', 'node-web-server-cli');
            rimraf.sync(repoDir);
            repository.Clone('https://github.com/itsananderson/node-web-server-cli.git', repoDir, function (err, repoPath) {
                if (err) throw err;

                assert.equal(repoPath, path.join(repoDir, '.git/'));

                var repo = new repository(repoPath);
                var head = repo.HeadSync();
                assert.equal(head.Name, 'master');

                var tip = head.TipSync();
                var name = head.Name;
                var branchHead = repo.LookupSync(name);
                assert.equal(tip.Sha, branchHead.Sha);

                done();
            });
        });
    }

    it('can clone from path', function(done) {
        this.timeout(5000);
        var originPath = path.join(path.dirname(__dirname), 'repos', 'node-web-server-cli/.git');
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2');
        rimraf.sync(repoDir);
        repository.Clone(originPath, repoDir, function(err, repoPath) {
            if (err) throw err;

            assert.equal(repoPath, path.join(repoDir, '.git/'));

            var repo = new repository(repoPath);
            var head = repo.HeadSync();
            assert.equal(head.Name, 'master');

            var tip = head.TipSync();
            var name = head.Name;
            var branchHead = repo.LookupSync(name);

            assert.equal(tip.Sha, branchHead.Sha);

            done();
        });
    });

    it('can list commits', function(done) {
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2', '.git');
        var repo = new repository(repoDir);
        var branches = repo.BranchesSync();
        assert.equal(2, Object.keys(branches).length);

        _.values(branches).forEach(function(branch) {
            var commits = branch.CommitsSync();
            assert.equal(49, commits.length);
        });

        done();
    });

    it('can fetch changes', function() {
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test1', '.git');
        var originPath = path.join(path.dirname(__dirname), 'repos', 'node-web-server-cli/.git');
        var repo = new repository(repoDir);

        var network = repo.NetworkSync();
        network.AddRemoteSync("origin", originPath);
        network.FetchSync("origin", {credentials: null});

        var originMaster = repo.BranchesSync()['origin/master'];
        assert.equal(49, originMaster.CommitsSync().length);
    });

    it('can pull changes', function() {
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2', '.git');
        var repo = new repository(repoDir);

        repo.ResetSync("hard", "HEAD~1");
        var head = repo.HeadSync();
        assert.equal(48, head.CommitsSync().length);
        var date = new Date();
        var signature = {
            name: 'Will Anderson',
            email: 'will@example.com',
            when: {
                datetime: date.getTime(),
                timespan: date.getTimezoneOffset() * 60 * 1000 * 10000
            }
        };
        repo.NetworkSync().PullSync(
            'origin',
            'master',
            signature,
            {
                fetch: {
                    credentials: null
                },
                merge: {}
            }
        );

        head = repo.HeadSync();
        assert.equal(49, head.CommitsSync().length);
    });

    it('can get a list of refs', function() {
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2', '.git');
        var repo = new repository(repoDir);
        assert.equal(2, repo.RefsSync().length);
    })
});

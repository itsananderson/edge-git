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
        this.timeout(5000);
        var repoDir = path.join(path.dirname(__dirname), 'repos', 'test2');
        rimraf.sync(repoDir);
        repository.Clone({url:'https://github.com/itsananderson/node-web-server-cli.git', path:repoDir}, function(err, repoPath) {
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
        assert.equal(2, branches.length);

        branches.forEach(function(branch) {
            var commits = branch.CommitsSync();
            assert.equal(49, commits.length);
        });

        done();
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
                    credentials: ""
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

using LibGit2Sharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibGit2SharpInvoke.Wrappers
{
    class BranchWrapper
    {
        private Branch branch;

        public bool IsRemote { get; private set; }

        public BranchWrapper TrackedBranch { get; private set; }

        public bool IsTracking { get; private set; }

        public Func<object, Task<object>> TrackingDetails { get; private set; }

        public Func<object, Task<object>> IsCurrentRepositoryHead { get; private set; }

        public Func<object, Task<object>> Tip { get; private set; }

        public Func<object, Task<object>> UpstreamBranchCanonicalName { get; private set; }

        public Remote Remote { get; private set; }

        public string CanonicalName { get; private set; }

        public Func<object, Task<object>> Commits { get; private set; }

        public string Name { get; private set; }

        public BranchWrapper(Repository repo, Branch branch)
        {
            this.branch = branch;
            IsRemote = branch.IsRemote;
            if (branch.TrackedBranch != null)
            {
                TrackedBranch = new BranchWrapper(repo, branch.TrackedBranch);
            }
            IsTracking = branch.IsTracking;
            TrackingDetails = (Func<object, Task<object>>)(async (j) => { return branch.TrackingDetails; });
            IsCurrentRepositoryHead = (Func<object, Task<object>>)(async (j) => { return branch.IsCurrentRepositoryHead; });
            Tip = async (j) => { return new CommitWrapper(branch.Tip); };
            UpstreamBranchCanonicalName = (Func<object, Task<object>>)(async (j) => { return branch.UpstreamBranchCanonicalName; });
            Remote = branch.Remote;
            CanonicalName = branch.CanonicalName;
            Commits = (Func<object, Task<object>>)(async (j) => {
                if (j != null)
                {
                    Commit after = repo.Lookup<Commit>((string)j);
                    Commit until = branch.Tip;
                    Commit ancestor = repo.Commits.FindMergeBase(after, until);
                    return CommitsAfter(after, until, ancestor).Distinct().Select(c => new CommitWrapper(c));
                }
                else
                {
                    return branch.Commits.Select(c => new CommitWrapper(c));
                }
            });
            Name = branch.Name;
        }

        private IEnumerable<Commit> CommitsAfter(Commit after, Commit until, Commit ancestor)
        {
            if (until.Sha != after.Sha && until.Sha != ancestor.Sha)
            {
                yield return until;
                foreach (var parent in until.Parents)
                {
                    foreach (var commit in CommitsAfter(after, parent, ancestor))
                    {
                        yield return commit;
                    }
                }
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibGit2SharpInvoke.Wrappers
{
    class BranchWrapper
    {
        private LibGit2Sharp.Branch branch;

        public bool IsRemote { get; private set; }

        public BranchWrapper TrackedBranch { get; private set; }

        public bool IsTracking { get; private set; }

        public Func<object, Task<object>> TrackingDetails { get; private set; }

        public Func<object, Task<object>> IsCurrentRepositoryHead { get; private set; }

        public Func<object, Task<object>> Tip { get; private set; }

        public Func<object, Task<object>> UpstreamBranchCanonicalName { get; private set; }

        public LibGit2Sharp.Remote Remote { get; private set; }

        public string CanonicalName { get; private set; }

        public Func<object, Task<object>> Commits { get; private set; }

        public string Name { get; private set; }

        public BranchWrapper(LibGit2Sharp.Branch b)
        {
            branch = b;
            IsRemote = b.IsRemote;
            if (b.TrackedBranch != null)
            {
                TrackedBranch = new BranchWrapper(b.TrackedBranch);
            }
            IsTracking = b.IsTracking;
            TrackingDetails = (Func<object, Task<object>>)(async (j) => { return b.TrackingDetails; });
            IsCurrentRepositoryHead = (Func<object, Task<object>>)(async (j) => { return b.IsCurrentRepositoryHead; });
            Tip = async (j) => { return new CommitWrapper(b.Tip); };
            UpstreamBranchCanonicalName = (Func<object, Task<object>>)(async (j) => { return b.UpstreamBranchCanonicalName; });
            Remote = b.Remote;
            CanonicalName = b.CanonicalName;
            Commits = (Func<object, Task<object>>)(async (j) => { return b.Commits.Select(c => new CommitWrapper(c)); });
            Name = b.Name;
        }
    }
}

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

        public Func<object, Task<object>> IsRemote { get; private set; }

        public Func<object, Task<object>> TrackedBranch { get; private set; }

        public Func<object, Task<object>> IsTracking { get; private set; }

        public Func<object, Task<object>> TrackingDetails { get; private set; }

        public Func<object, Task<object>> IsCurrentRepositoryHead { get; private set; }

        public Func<object, Task<object>> Tip { get; private set; }

        public Func<object, Task<object>> UpstreamBranchCanonicalName { get; private set; }

        public Func<object, Task<object>> Remote { get; private set; }

        public Func<object, Task<object>> CanonicalName { get; private set; }

        public Func<object, Task<object>> Commits { get; private set; }

        public Func<object, Task<object>> Name { get; private set; }

        public BranchWrapper(LibGit2Sharp.Branch b)
        {
            branch = b;
            IsRemote = (Func<object, Task<object>>)(async (j) => { return b.IsRemote; });
            TrackedBranch = (Func<object, Task<object>>)(async (j) => { return b.TrackedBranch; });
            IsTracking = (Func<object, Task<object>>)(async (j) => { return b.IsTracking; });
            TrackingDetails = (Func<object, Task<object>>)(async (j) => { return b.TrackingDetails; });
            IsCurrentRepositoryHead = (Func<object, Task<object>>)(async (j) => { return b.IsCurrentRepositoryHead; });
            Tip = (Func<object, Task<object>>)(async (j) => { return b.Tip; });
            UpstreamBranchCanonicalName = (Func<object, Task<object>>)(async (j) => { return b.UpstreamBranchCanonicalName; });
            Remote = (Func<object, Task<object>>)(async (j) => { return b.Remote; });
            CanonicalName = (Func<object, Task<object>>)(async (j) => { return b.CanonicalName; });
            Commits = (Func<object, Task<object>>)(async (j) => { return b.Commits; });
            Name = (Func<object, Task<object>>)(async (j) => { return b.Name; });
        }
    }
}

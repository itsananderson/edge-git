using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibGit2SharpInvoke.StaticWrappers;

namespace LibGit2SharpInvoke.Wrappers
{
    class RepositoryWrapper
    {
        private LibGit2Sharp.Repository repo;
        public Func<object, Task<object>> Head;
        public Func<object, Task<object>> Config;
        public Func<object, Task<object>> Index;
        public Func<object, Task<object>> Ignore;
        public Func<object, Task<object>> Network;
        public Func<object, Task<object>> ObjectDatabase;
        public Func<object, Task<object>> Refs;
        public Func<object, Task<object>> Commits;
        public Func<object, Task<object>> Tags;
        public Func<object, Task<object>> Stashes;
        public Func<object, Task<object>> Info;
        public Func<object, Task<object>> Diff;
        public Func<object, Task<object>> Notes;
        public Func<object, Task<object>> Submodules;
        public Func<object, Task<object>> Branches;
        public Func<object, Task<object>> Dispose;
        public Func<object, Task<object>> Lookup;

        public RepositoryWrapper(LibGit2Sharp.Repository repo)
        {
            this.repo = repo;
            Head = (async (i) => { return repo.Head; });
            Config = (async (i) => { return repo.Config; });
            Index = (async (i) => { return repo.Index; });
            Ignore = (async (i) => { return repo.Ignore; });
            Network = (async (i) => { return repo.Network; });
            ObjectDatabase = (async (i) => { return repo.ObjectDatabase; });
            Refs = (async (i) => { return repo.Refs; });
            Commits = (async (i) => { return repo.Commits; });
            Tags = (async (i) => { return repo.Tags; });
            Stashes = (async (i) => { return repo.Stashes; });
            Info = (async (i) => { return repo.Info; });
            Diff = (async (i) => { return repo.Diff; });
            Notes = (async (i) => { return repo.Notes; });
            Submodules = (async (i) => { return repo.Submodules; });
            Dispose = (async (i) => { repo.Dispose(); return null; });
            Lookup = (async (id) => { return repo.Lookup(id.ToString()); });
            Branches = (async (i) =>
                        repo.Branches.Select(b => new
                        {
                            IsRemote = b.IsRemote,
                            TrackedBranch = (Func<object, Task<object>>)(async (j) => { return b.TrackedBranch; }),
                            IsTracking = b.IsTracking,
                            TrackingDetails = (Func<object, Task<object>>)(async (j) => { return b.TrackingDetails; }),
                            IsCurrentRepositoryHead = b.IsCurrentRepositoryHead,
                            Tip = (Func<object, Task<object>>)(async (j) => { return b.Tip; }),
                            UpstreamBranchCanonicalName = b.UpstreamBranchCanonicalName,
                            Remote = (Func<object, Task<object>>)(async (j) => { return b.Remote; }),
                            CanonicalName = b.CanonicalName,
                            Commits = (Func<object, Task<object>>)(async (j) => { return b.Commits; }),
                            Name = b.Name
                        }).ToArray()
                    );
        }
    }
}

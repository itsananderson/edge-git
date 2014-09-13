using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Reflection;
using System.Dynamic;
using LibGit2Sharp;

public class Startup {
    public async Task<object> Invoke(dynamic a) {
        return new {
            Constructor = (Func<object, Task<object>>)(async (path) => {
                var repo = new Repository(path.ToString());
                return new {
                    Head = (Func<object, Task<object>>)(async (i) => { return repo.Head; }),
                    Config = (Func<object, Task<object>>)(async (i) => { return repo.Config; }),
                    Index = (Func<object, Task<object>>)(async (i) => { return repo.Index; }),
                    Ignore = (Func<object, Task<object>>)(async (i) => { return repo.Ignore; }),
                    Network = (Func<object, Task<object>>)(async (i) => { return repo.Network; }),
                    ObjectDatabase = (Func<object, Task<object>>)(async (i) => { return repo.ObjectDatabase; }),
                    Refs = (Func<object, Task<object>>)(async (i) => { return repo.Refs; }),
                    Commits = (Func<object, Task<object>>)(async (i) => { return repo.Commits; }),
                    Tags = (Func<object, Task<object>>)(async (i) => { return repo.Tags; }),
                    Stashes = (Func<object, Task<object>>)(async (i) => { return repo.Stashes; }),
                    Info = (Func<object, Task<object>>)(async (i) => { return repo.Info; }),
                    Diff = (Func<object, Task<object>>)(async (i) => { return repo.Diff; }),
                    Notes = (Func<object, Task<object>>)(async (i) => { return repo.Notes; }),
                    Submodules = (Func<object, Task<object>>)(async (i) => { return repo.Submodules; }),
                    Branches = (Func<object,Task<object>>)(async (i) => {
                        return repo.Branches.Select(b => new {
                            IsRemote = b.IsRemote,
                            TrackedBranch = (Func<object,Task<object>>)(async (j) => { return b.TrackedBranch; }),
                            IsTracking = b.IsTracking,
                            TrackingDetails = (Func<object,Task<object>>)(async (j) => { return b.TrackingDetails; }),
                            IsCurrentRepositoryHead = b.IsCurrentRepositoryHead,
                            Tip = (Func<object,Task<object>>)(async (j) => { return b.Tip; }),
                            UpstreamBranchCanonicalName = b.UpstreamBranchCanonicalName,
                            Remote = (Func<object,Task<object>>)(async (j) => { return b.Remote; }),
                            CanonicalName = b.CanonicalName,
                            Commits = (Func<object,Task<object>>)(async (j) => { return b.Commits; }),
                            Name = b.Name
                        }).ToArray();
                    }),
                    Dispose = (Func<object, Task<object>>)(async (i) => { repo.Dispose(); return null; }),
                    Lookup = (Func<object, Task<object>>)(async (id) => { return repo.Lookup(id.ToString()); })
                };
            }),
            Init = (Func<object, Task<object>>)(async (dynamic path) => {
                return Repository.Init(path.ToString());
            }),

            Clone = (Func<object, Task<object>>)(async (dynamic input) => {
                return Repository.Clone(input.url.ToString(), input.path.ToString());
            }),

            IsValid = (Func<object,Task<object>>)(async (path) => {
                return Repository.IsValid(path.ToString());
            })
        };
    }
}

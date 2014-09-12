#r "{libgit2sharp_path}"

using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Reflection;
using System.Dynamic;
using LibGit2Sharp;

public class Startup {
    public async Task<object> Invoke(dynamic input) {
        var path = input.path.ToString();

        var repo = new Repository(path);

        return new {
            branches = (Func<object,Task<object>>)(async (i) => {
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
            })
        };
    }
}
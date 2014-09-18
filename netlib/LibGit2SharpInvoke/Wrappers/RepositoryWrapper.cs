using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibGit2Sharp;

namespace LibGit2SharpInvoke.Wrappers
{
    class RepositoryWrapper
    {
        private Repository repo;
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
        public Func<object, Task<object>> Reset;

        public RepositoryWrapper(Repository repo)
        {
            this.repo = repo;
            Head = async (i) => { return new BranchWrapper(repo.Head); };
            Config = async (i) => { return repo.Config; };
            Index = async (i) => { return repo.Index; };
            Ignore = async (i) => { return repo.Ignore; };
            Network = async (i) => { return new NetworkWrapper(repo.Network); };
            ObjectDatabase = async (i) => { return repo.ObjectDatabase; };
            Refs = async (i) => { return repo.Refs; };
            Commits = async (i) => { return repo.Commits.Select(c => new CommitWrapper(c)); };
            Tags = async (i) => { return repo.Tags; };
            Stashes = async (i) => { return repo.Stashes; };
            Info = async (i) => { return repo.Info; };
            Diff = async (i) => { return repo.Diff; };
            Notes = async (i) => { return repo.Notes; };
            Submodules = async (i) => { return repo.Submodules; };
            Dispose = async (i) => { repo.Dispose(); return null; };
            Lookup = async (id) => {
                var found = repo.Lookup(id.ToString());
                if (found.GetType() == typeof(Commit)) {
                    return new CommitWrapper((Commit)found);
                } else {
                    return found;
                }
            };
            Branches = async (i) => repo.Branches.Select(b => new BranchWrapper(b));
            Reset = async (dynamic i) => {
                var modeName = ((string)i.mode).ToLower();
                ResetMode mode;
                if (modeName == "soft") {
                    mode = ResetMode.Soft;
                } else if (modeName == "mixed") {
                    mode = ResetMode.Mixed;
                } else {
                    mode = ResetMode.Hard;
                }
                var committish = (string)i.committish;
                repo.Reset(mode, committish, null, null);
                return null;
            };
        }
    }
}

using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LibGit2SharpInvoke.Wrappers
{
    class CommitWrapper
    {
        private LibGit2Sharp.Commit commit;


        public string Sha;
        public string MessageShort;
        public string Message;
        public LibGit2Sharp.Tree Tree;
        public Func<object, Task<object>> Parents;

        public CommitWrapper(LibGit2Sharp.Commit commit)
        {
            this.commit = commit;

            Sha = commit.Sha;
            MessageShort = commit.MessageShort;
            Message = commit.Message;
            Tree = commit.Tree;
            Parents = (async (i) => commit.Parents.Select((p) => new CommitWrapper(p)));
        }
    }
}

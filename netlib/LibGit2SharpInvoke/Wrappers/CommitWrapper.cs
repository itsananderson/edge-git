using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using LibGit2Sharp;

namespace LibGit2SharpInvoke.Wrappers
{
    class CommitWrapper
    {
        private LibGit2Sharp.Commit commit;


        public string Sha;
        public string MessageShort;
        public string Message;
        public Signature Author;
        public Signature Committer;
        public Func<object, Task<object>> Tree;
        public Func<object, Task<object>> Parents;

        public CommitWrapper(LibGit2Sharp.Commit commit)
        {
            this.commit = commit;

            Sha = commit.Sha;
            MessageShort = commit.MessageShort;
            Message = commit.Message;
            Author = commit.Author;
            Committer = commit.Committer;
            Tree = (async (i) => commit.Tree);
            Parents = (async (i) => commit.Parents.Select((p) => new CommitWrapper(p)));
        }
    }
}

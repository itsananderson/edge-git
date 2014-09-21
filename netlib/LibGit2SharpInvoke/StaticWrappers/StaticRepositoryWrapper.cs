using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibGit2Sharp;
using LibGit2SharpInvoke.Wrappers;

namespace LibGit2SharpInvoke.StaticWrappers
{
    class StaticRepositoryWrapper
    {
        public Func<object, Task<object>> Constructor;
        public Func<object, Task<object>> Init;
        public Func<object, Task<object>> Clone;
        public Func<object, Task<object>> IsValid;

        public StaticRepositoryWrapper() {
            Constructor = (async (path) => {
                var repo = new Repository(path.ToString());
                return new RepositoryWrapper(repo);
            });
            Init = (Func<object, Task<object>>)(async (dynamic path) => {
                return Repository.Init(path.ToString());
            });

            Clone = (Func<object, Task<object>>)(async (dynamic input) => {
                if (null == input.options)
                {
                    return Repository.Clone(input.url.ToString(), input.path.ToString());
                }
                else
                {
                    return Repository.Clone(input.url.ToString(), input.path.ToString(), StaticCloneOptionsWrapper.GenerateCloneOptions(input.options));
                }

            });

            IsValid = (async (path) => {
                return Repository.IsValid(path.ToString());
            });
        }
    }
}

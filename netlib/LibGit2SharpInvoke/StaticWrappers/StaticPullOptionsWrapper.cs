using System;
using LibGit2Sharp;

namespace LibGit2SharpInvoke.StaticWrappers
{
    class StaticPullOptionsWrapper
    {
        public static PullOptions GeneratePullOptions(dynamic input)
        {
            return new PullOptions
            {
                FetchOptions = StaticFetchOptionsWrapper.GenerateFetchOptions(input.fetch),
                MergeOptions = StaticMergeOptionsWrapper.GenerateMergeOptions(input.merge),
            };
        }
    }
}

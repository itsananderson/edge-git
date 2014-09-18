using System;
using LibGit2Sharp;

namespace LibGit2SharpInvoke.StaticWrappers
{
    class StaticMergeOptionsWrapper
    {
        public static MergeOptions GenerateMergeOptions(dynamic input)
        {
            // TODO: Set more merge options
            return new MergeOptions();
        }
    }
}

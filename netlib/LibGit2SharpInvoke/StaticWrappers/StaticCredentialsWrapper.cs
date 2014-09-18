using System;
using LibGit2Sharp;

namespace LibGit2SharpInvoke.StaticWrappers
{
    public class StaticCredentialsWrapper
    {
        public static Credentials GenerateCredentials(dynamic input)
        {
            return new DefaultCredentials();
        }
    }
}

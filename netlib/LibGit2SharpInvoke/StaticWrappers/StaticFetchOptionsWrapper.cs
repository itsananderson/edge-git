using System;
using LibGit2Sharp;

namespace LibGit2SharpInvoke.StaticWrappers
{
    class StaticFetchOptionsWrapper
    {
        public static FetchOptions GenerateFetchOptions(dynamic input)
        {
            return new FetchOptions
            {
                // TODO: implement other options
                Credentials = StaticCredentialsWrapper.GenerateCredentials(input.credentials)
            };
        }
    }
}

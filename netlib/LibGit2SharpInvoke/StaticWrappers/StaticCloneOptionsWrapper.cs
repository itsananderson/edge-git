using LibGit2Sharp;

namespace LibGit2SharpInvoke.StaticWrappers
{
    class StaticCloneOptionsWrapper
    {
        public static CloneOptions GenerateCloneOptions(dynamic options)
        {
            return new CloneOptions
            {
                IsBare = options.bare,
                Checkout = options.checkout,
                Credentials = StaticCredentialsWrapper.GenerateCredentials(options.credentials)
            };
        }
    }
}
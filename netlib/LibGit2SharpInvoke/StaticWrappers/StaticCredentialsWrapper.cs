using System;
using LibGit2Sharp;

namespace LibGit2SharpInvoke.StaticWrappers
{
    public class StaticCredentialsWrapper
    {
        public static Credentials GenerateCredentials(dynamic input)
        {
            if (null == input)
            {
                return new DefaultCredentials();
            }
            else
            {
                return new UsernamePasswordCredentials()
                {
                    Username = input.username,
                    Password = input.password
                };
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibGit2Sharp;

namespace LibGit2SharpInvoke.StaticWrappers
{
    class StaticPushOptionsWrapper
    {
        public static PushOptions GeneratePushOptions(dynamic input)
        {
            return new PushOptions
            {
                Credentials = StaticCredentialsWrapper.GenerateCredentials(input.credentials)
            };
        }
    }
}

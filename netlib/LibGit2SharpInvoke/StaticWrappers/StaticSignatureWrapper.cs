using System;

namespace LibGit2SharpInvoke.StaticWrappers
{
    class StaticSignatureWrapper
    {
        public static LibGit2Sharp.Signature GenerateSignature(dynamic input)
        {
            return new LibGit2Sharp.Signature((string)input.name, (string)input.email, GenerateDateTimeOffset(input.when));
        }

        public static DateTimeOffset GenerateDateTimeOffset(dynamic input)
        {
            return new DateTimeOffset((long)input.datetime, new TimeSpan((long)input.timespan));
        }
    }
}

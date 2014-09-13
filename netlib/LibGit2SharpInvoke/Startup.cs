using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibGit2SharpInvoke.StaticWrappers;

namespace LibGit2SharpInvoke
{
    public class Startup
    {
        public async Task<object> Invoke(object input)
        {
            var type = input.ToString();

            if ("Repository" == type)
            {
                return new StaticRepositoryWrapper();
            }

            return null;
        }
    }
}

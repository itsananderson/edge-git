#r "{libgit2sharp_path}"

using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Reflection;
using System.Dynamic;
using LibGit2Sharp;

public class Startup {
    public async Task<object> Invoke(dynamic input) {
        var path = input.path.ToString();

        var repo = new Repository(path);

        return (Func<object,Task<object>>)(async (i) => {
            return repo.Branches.Select(b => b.Name).ToArray();
        });
    }
}

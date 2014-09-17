using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibGit2Sharp;
using System.IO;

namespace LibGit2SharpInvoke.CommandLine
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(Directory.GetCurrentDirectory());
            using (Repository r = new Repository("../../../../repos/test2/.git/"))
            {
                Console.WriteLine("test");
            }
        }
    }
}

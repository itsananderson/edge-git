using System;
using System.Linq;
using System.Threading.Tasks;
using LibGit2SharpInvoke.StaticWrappers;

namespace LibGit2SharpInvoke.Wrappers
{
    class NetworkWrapper
    {
        private LibGit2Sharp.Network network;
        public Func<object, Task<object>> Remotes;
        public Func<object, Task<object>> ListReferences;
        public Func<object, Task<object>> Fetch;
        public Func<object, Task<object>> Pull;
        public Func<object, Task<object>> Push;

        public NetworkWrapper(LibGit2Sharp.Network network)
        {
            this.network = network;
            Remotes = async (i) => network.Remotes;
            ListReferences = async (i) => {
                if (i.GetType() == typeof(String)) {
                    return network.ListReferences(i.ToString());
                } else {
                    return network.ListReferences(network.Remotes.First(r => r.Name == ((dynamic)i).name));
                }
            };
            Fetch = async (dynamic i) =>
            {
                var remote = network.Remotes.First(r => r.Name == i.remote);
                network.Fetch(remote);
                return null;
            };
            Pull = async (dynamic i) =>
            {
                var signature = StaticSignatureWrapper.GenerateSignature(i.signature);
                var options = StaticPullOptionsWrapper.GeneratePullOptions(i.options);
                return network.Pull(signature, options);
            };
            Push = async (dynamic i) =>
            {
                var remote = network.Remotes.First(r => r.Name == i.remote);
                var objectish = (string)i.objectish;
                var destinationSpec = (string)i.destinationSpec;
                var signature = StaticSignatureWrapper.GenerateSignature(i.signature);
                var options = StaticPushOptionsWrapper.GeneratePushOptions(i.options);
                var logMessage = (string)i.logMessage;
                network.Push(remote, objectish, destinationSpec, options, signature, logMessage);
                return null;
            };


        }
    }
}

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
        var target = input.target.ToString();
        var path = input.path.ToString();

        if ("StaticMethod" == target) {
            var methodName = input.method.ToString();
            var className = input.className.ToString();
            var args = ((object[])input.args)
                .ToArray();
            MethodInfo method;
            var tInput = input as IDynamicMetaObjectProvider;
            var members = tInput.GetMetaObject(System.Linq.Expressions.Expression.Constant(tInput)).GetDynamicMemberNames();
            var classType = Assembly.LoadFile(@"{libgit2sharp_path}").GetType(className);
            if (members.Contains("argTypes"))
            {
                var argTypes = ((object[])input.argTypes)
                    .Cast<string>()
                    .Select(t => Type.GetType(t) )
                    .ToArray();
                method = classType.GetMethod(methodName, argTypes);
            } else {
                method = classType.GetMethod(methodName);
            }
            return method.Invoke(null, args);
        }

        using (var repo = new Repository(path)) {
            if ("Property" == target) {
                var propertyName = input.property.ToString();
                var select = input.select.ToString();
                Type t = repo.GetType();
                PropertyInfo p = t.GetProperty(propertyName);
                dynamic v = p.GetValue(repo, null);
                if (select.Length > 0) {
                    return v.GetType().GetProperty(select).GetValue(v, null);
                } else {
                    return v;
                }
            }

            if ("EnumerableProperty" == target) {
                var propertyName = input.property.ToString();
                var select = input.select.ToString();
                Type t = repo.GetType();
                PropertyInfo p = t.GetProperty(propertyName);
                dynamic v = p.GetValue(repo, null);

                var list = new List<object>();
                foreach (var i in v) {
                    list.Add(i.GetType().GetProperty(select).GetValue(i, null));
                }
                return list;
            }
        }

        return null;
    }
}

var edge = require('edge');

var f = edge.func(function() {/*
using System;
using System.Threading.Tasks;

class Startup {
  public async Task<object> Invoke(object input) {
    return new Testing();
  }
}

class Testing {
  public Func<object, Task<object>> t = async (a) => a.ToString();
  public string Name = "test";
}
*/});

console.log(f(null, true));

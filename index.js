var edge = require('edge');

var myFunction = edge.func(function() {/*
    async (input) => {
        return "Hello, " + input.ToString();
    }
*/});

myFunction('World', function(err, result) {
    if (err) throw err;
    console.log(result);
});
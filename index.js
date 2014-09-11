var edge = require('edge');

var myFunction = edge.func(function() {/*
    async (input) => {
        return "Hello, World";
    }
*/});

myFunction('asdf', function(err, result) {
    if (err) throw err;
    console.log(result);
});
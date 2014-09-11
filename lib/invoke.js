var edge = require('edge'),
    path = require('path');

module.exports = edge.func(path.join(__dirname, 'invoke.cs'));

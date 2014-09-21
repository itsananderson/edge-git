var app = {};

app.addDirectCalls = function addDirectCalls(self, obj) {
    Object.keys(obj).forEach(function(key) {
        if (!self[key]) {
            if (typeof obj[key] === 'function') {
                self[key] = function(cb) { obj[key](null, cb) };
                self[key + 'Sync'] = function() { return obj[key](null, true) };
            } else {
                self[key] = obj[key];
            }
        }
    });
};

module.exports = app;
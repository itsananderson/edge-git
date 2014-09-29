var app = {};

app.addDirectCalls = function addDirectCalls(self, obj) {
    Object.keys(obj).forEach(function(key) {
        if (!self[key]) {
            if (typeof obj[key] === 'function') {
                self[key] = function(arg, cb) {
                    if (typeof arg === 'function') {
                        cb = arg;
                        arg = undefined;
                    }
                    obj[key](arg, cb)
                };
                self[key + 'Sync'] = function(arg) { return obj[key](arg, true) };
            } else {
                self[key] = obj[key];
            }
        }
    });
};

module.exports = app;

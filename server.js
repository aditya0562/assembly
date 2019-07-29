process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

var app = require('bin/app');
app.start();

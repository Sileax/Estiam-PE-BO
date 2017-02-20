require('fetch-everywhere');
require('babel-register')({
    presets: ['react']
});

var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();

app.use(cookieParser());
app.use(express.static('public'));
app.use(require('./routes/index.jsx'));

var PORT = 8000;
app.listen(PORT, function() {
    console.log('http://localhost:' + PORT);
});

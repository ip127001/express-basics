var express = require("express");
var app = express();

app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/yo', function (req, res) {
    res.send('yo world');
});

var server = app.listen(3000, function () {
    console.log("server running at http://localhost:" + server.address().port);
});
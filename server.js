var express = require("express");
var app = express();

var fs = require('fs');
var engines = require('consolidate');

var _ = require('lodash');
var users = [];

fs.readFile('users.json', {
    encoding: 'utf-8'
}, function (err, data) {
    if (err) throw err;

    JSON.parse(data).forEach(function (user) {
        user.name.full = _.startCase(user.name.first + ' ' + user.name.last);
        users.push(user);
    })
})

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('index', {
        users: users
    })
});

app.get(/big.*/, function (req, res, next) {
    res.send("me here and there");
    next();
})

app.get('/:username', function (req, res) {
    var username = req.params.username;
    res.send(username);
})



app.get('/yo', function (req, res) {
    res.send('yo world');
});

var server = app.listen(3000, function () {
    console.log("server running at http://localhost:" + server.address().port);
});
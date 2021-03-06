var express = require('express')
var app = express()

var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var engines = require('consolidate')

var User = require('./db.js').User

var JSONStream = require('JSONStream');

var bodyParser = require('body-parser')

app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/profilepics', express.static('images'))
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/favicon.ico', function (req, res) {
    res.end()
})

app.get('/', function (req, res) {
    User.find({}, function (err, users) {
        res.render('index', {
            users: users
        })
    })
})

app.get('*.json', (req, res) => {
    res.download('./users/' + req.path, 'virus.exe');
})

app.get('/data/:username', function (req, res) {
    var username = req.params.username
    var readable = fs.createReadStream('./users' + username + '.json')
    readable.pipe(re)
})

app.use('/users/by/:gender', function (req, res) {
    var gender = req.params.gender
    var readable = fs.createReadStream('users.json')

    readable
        .pipe(JSONStream.parse('*', function (user) {
            if (user.gender == gender) return user.name
        }))
        .pipe(JSONStream.stringify())
        .pipe(res)
})

app.get('/error/:username', function (req, res, next) {
    res.status(404).send('no user named ' + req.params.username + ' found')
})

var userRouter = require('./username')
app.use('/:username', userRouter)

var server = app.listen(3000, function () {
    console.log('Server running at http://localhost:' + server.address().port)
})
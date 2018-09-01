var express = require('express')
var helpers = require('./helpers')
var fs = require('fs')
var User = require('./db.js').User

var router = express.Router({
    mergeParams: true
})

router.all('/', function (req, res, next) {
    console.log(req.method, 'for', req.params.username)
    next()
})

router.get('/', helpers.verifyUser, function (req, res) {
    var username = req.params.username
    User.findOne({
        username: username
    }, function (err, user) {
        res.render('user', {
            user: user,
            address: user.location
        })
    })
})

router.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send("server error")
})

router.put('/', function (req, res) {
    var username = req.params.username

    User.findOne({
        username: username
    }, function (err, user) {
        if (err) console.log(err)

        user.name.full = req.body.name;
        user.location = req.body.location;
        user.save(function () {
            res.end()
        })
    })
})


router.delete('/', function (req, res) {
    var fp = helpers.getUserFilePath(req.params.username)
    fs.unlinkSync(fp) // delete the file
    res.sendStatus(200)
})

module.exports = router
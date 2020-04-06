var express = require('express');
var router = express.Router();

var loginReq = require('../../middleware/loginReq');
var adminReq = require('../../middleware/adminReq');

var User = require('../../models/user');

router.get('/list', loginReq, adminReq, function(req, res, next) {
    User.find().lean().exec(function(err, users) {
        if(err) {
            console.log(err);
            var error = new Error('Could not get batches list.');
            error.status = 500;
            next(error);
        } else {
            const cleanedUsers = users.map((user) => {
                return {
                    username: user.username,
                    isAdmin: user.isAdmin
                }
            })
            res.send(JSON.stringify(cleanedUsers));
        }
    });
});

router.post('/remove', loginReq, adminReq, function(req, res, next) {
    if(req.body.username) {
        User.remove({ username: req.body.username }, function(err) {
            if(err) {
                var err = new Error('Could not delete user. The request may be malformed.');
                err.status = 500;
                return next(err);
            } else {
                res.end("Deleted user");
            }
        });
    } else {
        var err = new Error('username field required to delete user.');
        err.status = 400;
        return next(err);
    }
});

module.exports = router;
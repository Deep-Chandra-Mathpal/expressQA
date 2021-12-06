var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
    if(req.query.trace == "from_login"){
        var status_text = "Now you are logged in, go back and ask question or give answer";
        res.render('status', {status_text: status_text});
    }
    else if(req.query.trace == "from_login_bad_req"){
        var status_text = "Incorrect Username and/or Password!";
        res.render('status', {status_text: status_text});
    }
    else if(req.query.trace == "from_sign_up"){
        var status_text = "You are signed in! please login now";
        res.render('status', {status_text: status_text});
    }
    else if(req.query.trace == "from_sign_up_bad_req"){
        var status_text = "Username already exist";
        res.render('status', {status_text: status_text});
    }
	res.render('status');
});

module.exports = router;
/**
 * users.js consists of routes that provide data of the server to the client/web browser
 * The routes are exported to server.js. We use get, put, post and delete route methods.
 * users.js also requires the express-session module which is used for session management
 */
//use express-session for session management
const express = require("express");
const router = express.Router();
let con = require("../../mysqlconnection");
const sessions = require('express-session');
router.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767"
    , saveUninitialized: true
    , cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
    , resave: false
}));
let session;
//Get user data --->
router.get("/", (req, res) => {
    let sql = "SELECT * FROM accounts";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
});
//Create new user --->
router.post("/", (req, res) => {
    let sql = "INSERT INTO accounts (username, password, email, question, score) VALUES ('" + req.body
        .name + "', '" + req.body.password + "', '" + req.body.email + "', '" + 0 + "' , '" + 0 +
        "')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});
//Update User --->
router.put("/:name", (req, res) => {
    let sql = "UPDATE accounts SET email = '" + req.body.email + "', password = '" + req.body
        .password + "' WHERE username ='" + req.body.name + "'";
    con.query(sql, function (err, result) {})
});
//Update User --->
router.put('/', (req, res) => {
    console.log("test");
    console.log(req.body.question);
    let sql = "UPDATE accounts SET score = '" + req.body.score + "', question = '" + req.body
        .question + "' WHERE username ='" + req.body.name + "'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
});
//Delete User --->
router.delete("/:name", (req, res) => {
    console.log(req.body.name);
    let sql = "DELETE FROM accounts WHERE username ='" + req.body.name + "'";
    con.query(sql, function (err, result) {
        if (err) throw err;
    })
})
//Authenticate user --->
router.post('/authenticate', (req, res) => {
    var sql = "SELECT * FROM accounts";
    con.query(sql, function (err, result) {
        if (err) throw err;
        let mypassword;
        mypassword = false;
        for (let i = 0; i < result.length; i++) {
            if (result[i].email === req.body.email && result[i].password === req.body
                .password) {
                mypassword = true;
            }
        }
        if (mypassword) {
            session = req.session;
            session.userid = req.body.name;
            console.log(session);
            console.log("Logged in");
            var sql = "UPDATE accounts set sessionkey = '" + req.session.id +
                "' WHERE username ='" + req.body.name + "'";
            con.query(sql, function (err, result) {
                if (err) throw err;
            });
        } else {
            console.log("Wrong username or password!");
        }
    });
})
//Logout user --->
router.post('/logout', (req, res) => {
    let sql = "UPDATE accounts set sessionkey = NULL WHERE username ='" + req.body.name + "'";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
    console.log("req.session");
    console.log(req.session);
    console.log(session);
});
//Get the current user --->
router.get('/currentuser', (req, res) => {
    if ((typeof session) != 'undefined') {
        let sql = "SELECT * FROM accounts WHERE username ='" + session.userid + "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result);
        })
    } else {
        console.log('No user logged in.')
    }
});
module.exports = router;

/**
 * users.js consists of routes that provide data of the server to the client/web browser
 * The routes are exported to server.js. We use get, put, post and delete route methods.
 * 
 */
//use express-session for session management
const express = require("express");
const router = express.Router();
let con = require("../../mysqlconnection");
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
    let sql = "UPDATE accounts SET username = '" + req.body.name + "', password = '" + req.body
        .password + "' WHERE email ='" + req.body.email + "'";
    con.query(sql, function (err, result) {})
});
//Update User --->
router.put('/', (req, res) => {
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
    //req.session.regenerate(function (err) {});
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
            console.log(req.session);
            console.log("Logged in");
            console.log(JSON.stringify(req.cookies));
            var sql = "UPDATE accounts set sessionkey = '" + JSON.stringify(req.cookies) +
                "' WHERE email ='" + req.body.email + "'";
            con.query(sql, function (err, result) {
                if (err) throw err;
            });
        } else {
            console.log("Wrong username or password!");
        }
    });
    res.end()
})
//Logout user --->
router.post('/logout', (req, res) => {
    let sql = "UPDATE accounts set sessionkey = NULL WHERE username ='" + req.body.name + "'";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
    console.log('Session before destruction:', req.session);
    req.session.destroy();
    console.log('Session after destruction:', req.session);
});
//Get the current user --->
router.get('/currentuser', (req, res) => {
    cookiestring = JSON.stringify(req.cookies);
    if (cookiestring == '') {
        return
    }
    let sql = "SELECT username from accounts WHERE sessionkey ='" + cookiestring + "'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        if ((result) != '') {
            let sql = "SELECT * FROM accounts WHERE username ='" + result[0].username + "'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                res.json(result);
                if (result == '') {
                    return
                }
            })
        } else {
            console.log('No user logged in.')
        }
    });
});
module.exports = router;

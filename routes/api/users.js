/**
 * users.js consists routes that provid data from the server to the client/web browser
 * The routes are exported to index.js
 */

const express = require("express");
const router = express.Router();
let con = require("../../mysqlconnection");
//const session = require("../../index.js");

const sessions = require('express-session');
router.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false
}));
var session;

//Get user data --->
router.get("/", (req, res) => {
  var sql = "SELECT * FROM accounts";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);})
});

//Create new user --->
router.post("/", (req, res) => {
  var sql = "INSERT INTO accounts (username, password, email, question, score) VALUES ('" + req.body.name + "', '" + req.body.password + "', '" + req.body.email + "', '" + 0 + "' , '" + 0 + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

//Update User
router.put("/:name", (req, res) => {
  var sql = "UPDATE accounts SET email = '" + req.body.email + "', password = '" + req.body.password + "' WHERE username ='" + req.body.name + "'";
  con.query(sql, function (err, result) {
  })
});

//Update User
router.put('/', (req, res) => {
  console.log("test");

  console.log(req.body.question);

  var sql = "UPDATE accounts SET score = '" + req.body.score + "', question = '" + req.body.question + "' WHERE username ='" + req.body.name + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  })
});

//Delete User --->
router.delete("/:name", (req, res) => {
  console.log(req.body.name);

  var sql = "DELETE FROM accounts WHERE username ='" + req.body.name + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;



  
  })
 })

//Authenticate user --->
router.post('/authenticate',(req,res) => {
  var sql = "SELECT * FROM accounts";
  con.query(sql, function (err, result) {
    if (err) throw err;
    let mypassword;
    mypassword = false;
    for (let i = 0; i < result.length; i++) {
      if(result[i].email === req.body.email && result[i].password === req.body.password)
       {mypassword = true;}
      }
    if(mypassword){
      session=req.session;
      session.userid=req.body.name;

        console.log(session);
        console.log("Logged in");

        var sql = "UPDATE accounts set sessionkey = '" + req.session.id + "' WHERE username ='" + req.body.name + "'";
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
        //res.sendFile('frontend/index.html',{root:__dirname});
    }
    else{
        console.log("Wrong username or password!");
    }
  });
 })
 
 
router.post('/logout',(req,res) => {
  var sql = "UPDATE accounts set sessionkey = NULL WHERE username ='" + req.body.name + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
  
  console.log("req.session");
  console.log(req.session);
  console.log(session);
});




router.get('/currentuser', (req, res) => {
  console.log(session);
  var sql = "SELECT * FROM accounts WHERE username ='" + session.userid + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);})
});

module.exports = router;

const express = require("express");
const router = express.Router();
let users = require("../../userdata");
var session;
let con = require("../../mysqlconnection");


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
/*
  const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {

    const updateUser = req.body;
    users.forEach(user => {

      if (user.id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.email = updateUser.email ? updateUser.email : user.email;
        user.password = updateUser.password ? updateUser.password : user.password;
        user.score = updateUser.score ? updateUser.score : user.score;
        user.question = updateUser.question ? updateUser.question : user.question;
        res.json({ msg: "User updated", user });
        console.log(req.session);
      }
    });
  } else {
    res.sendStatus(400);
  }*/
  })
});

//Update User
router.put("/scoreupdate/:name", (req, res) => {
  console.log(req);

  console.log(req.body.question);

  var sql = "UPDATE accounts SET score = '" + req.body.score + "', question = '" + req.body.question + "' WHERE username ='" + req.body.name + "'";
  con.query(sql, function (err, result) {

  })
});

//Delete User --->
router.delete("/:name", (req, res) => {
  console.log(req.body.name);

  var sql = "DELETE FROM accounts WHERE username ='" + req.body.name + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;

  if (true) {
    users = users.filter(user => user.name !== req.params.name)
    res.json({
      msg: "User deleted",
      users
    });

  } else {
    res.sendStatus(400);
  }

  })

/*
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
        session.userid=req.body.username;
        console.log(req.session);
        console.log(req.session.id);
        console.log("Logged in");
        //res.sendFile('frontend/index.html',{root:__dirname});
    }
    else{
        console.log("Wrong username or password!");
    }
  });*/
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
        session.userid=req.body.username;
        console.log(req.session);
        console.log(req.session.id);
        console.log("Logged in");
        //res.sendFile('frontend/index.html',{root:__dirname});
    }
    else{
        console.log("Wrong username or password!");
    }
  });
 })
 
router.get("/logout",(req,res) => {
  console.log(session);

  req.session.destroy();
  console.log("Logged out!");
  console.log(session);

  res.redirect('/');
});

module.exports = router;

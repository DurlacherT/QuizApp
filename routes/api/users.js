const express = require("express");
const router = express.Router();
let users = require("../../userdata");
let session = require("../../index");


//Get all users
router.get("/", (req, res) => {
  res.json(users);
});

//Get user with user ID
router.get("/:id", (req, res) => {

  const found = users.some(user => user.id === parseInt(req.params.id));
  
  if (found) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  } else {
    res.sendStatus(400);
  }
});
 
//Create new user
router.post("/", (req, res) => {

  const newUser = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    score: req.body.score,
    question: req.body.question
  };

  if (!newUser.name || !newUser.email) {
    return res.sendStatus(400);
  }

  users.push(newUser);
  res.json(users);
});


//Update User
router.put("/:id", (req, res) => {

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
  }

});


//Delete User
router.delete("/:id", (req, res) => {

  const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {
    users = users.filter(user => user.id !== parseInt(req.params.id))
    res.json({
      msg: "User deleted",
      users
    });

  } else {
    res.sendStatus(400);
  }
});

module.exports = router;

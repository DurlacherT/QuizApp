const express = require('express'); 
const sessions = require('express-session');
const bodyParser = require('body-parser');
const app = express();              
const port = 8000;                  
const path = require('path');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const router = require('./routes/api/users');
let users = require("./Users");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", require("./routes/api/users")); //importes user routes






app.use(express.static(path.join(__dirname, 'frontend')));



const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

let mypassword = false;

// a variable to save a session
var session;


app.post('/user',(req,res) => {
  for (let i = 0; i < users.length; i++) {
     mypassword = true;
     console.log(users[i].email === req.body.username && users[i].password === req.body.password);
    }
  if(mypassword){
    session=req.session;
      session.userid=req.body.username;
      console.log(req.session);
      res.sendFile('frontend/index.html',{root:__dirname});
      console.log(req.body.username);
  }
  else{
      console.log("Wrong username!");
      
  }

})


app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});




app.listen(port, (error) => {
  if (error) {
      console.log(error);
  } else {
      console.log(`Server listening at http://localhost:${port}`)
  }
});
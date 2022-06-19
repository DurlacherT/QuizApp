const express = require('express'); 
const sessions = require('express-session');
const app = express();              
const port = 8000;                  
const path = require('path');
const cookieParser = require("cookie-parser");
let users = require("./userdata");

var session;    // a variable to save a session
const oneDay = 1000 * 60 * 60 * 24;  // day in milliseconds


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", require("./routes/api/users")); //User routes
app.use(express.static(path.join(__dirname, 'frontend')));


app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));


app.post('/:username',(req,res) => {
  let mypassword;
  for (let i = 0; i < users.length; i++) {
    if(users[i].email === req.body.username && users[i].password === req.body.password)
     {mypassword = true;}
    }
  if(mypassword){
    session=req.session;
      session.userid=req.body.username;
      console.log(req.session);
      console.log(req.session.id);

      res.sendFile('frontend/index.html',{root:__dirname});
  }
  else{
      console.log("Wrong username or password!");
  }
})



app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
  console.log("Session ended");
});


app.listen(port, (error) => {
  if (error) {
      console.log(error);
  } else {
      console.log(`Server listening at http://localhost:${port}`)
  }
});


module.exports = session;

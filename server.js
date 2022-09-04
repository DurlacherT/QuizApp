const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(session({
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60*60*60*24,
    httpOnly: true,
    domain:'localhost:8000',
    path: '/',
    secure: false
  }
}));


app.use("/api/users", require("./routes/api/users"));
app.use(express.static(path.join(__dirname, 'frontend')));
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`)
    }
});


module.exports = session;

/**
 * server.js provides basic server functionality
 * it requires the express-session module which is used for session management
 */
const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const session = require('express-session');
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767"
  , saveUninitialized: true
  , cookie: {
      maxAge: 1000 * 60 * 60 * 24
  }
  , resave: false
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

const express = require('express');
const app = express();
const port = 8000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
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

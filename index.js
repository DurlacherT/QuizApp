const express = require('express'); 
const app = express();              
const port = 5000;                  
const path = require('path');



app.use(express.static(path.join(__dirname, 'frontend')));


app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`)
    }
});
app.post('/', (req, res) => {
    res.send('Got a POST request')
  })
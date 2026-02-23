const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send("Welcome to the course management API!")
})

app.listen(5000,() => {
    console.log("Server running on port 5000...")
})
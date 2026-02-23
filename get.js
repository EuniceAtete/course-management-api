const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send("Welcome to the course management API!")
})

let courses = [
  { id: 1, name: 'Node.js Basics', authorId: 1, price: 50 },
  { id: 2, name: 'Express Advanced', authorId: 2, price: 80 }
];

app.get('/courses',(req,res) => {
    res.json(courses);
})


app.get('/courses',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');
    res.json(course);
});

app.listen(5000,() => {
    console.log("Server running on port 5000...")
})
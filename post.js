const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

let courses = [
  { id: 1, name: 'Node.js Basics', authorId: 1, price: 50 },
  { id: 2, name: 'Express Advanced', authorId: 2, price: 80 }
];

app.post('/courses/addNew', (req, res) => {
    const courseSchema = Joi.object({
        name: Joi.string().min(3).required(),
        authorId: Joi.number().required(),
        price: Joi.number().positive().required()
    });

    const { error } = courseSchema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const newCourse = {
        id: courses.length ? courses[courses.length - 1].id + 1 : 1,
        name: req.body.name,
        authorId: req.body.authorId,
        price: req.body.price
    };

    courses.push(newCourse);
    res.status(201).send({ message: "New course registered", registeredCourse: newCourse });
});

app.get('/courses', (req, res) => {
    res.send(courses);
});

app.listen(5000, () => console.log("Server running on port 5000..."));
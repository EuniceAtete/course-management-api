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

app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send({ message: "Course not found" });
    res.send(course);
});

app.put('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send({ message: "Course not found" });

    const schema = Joi.object({
        name: Joi.string().min(3),
        authorId: Joi.number(),
        price: Joi.number().positive()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    course.name = req.body.name || course.name;
    course.authorId = req.body.authorId || course.authorId;
    course.price = req.body.price || course.price;

    res.send({ message: "Course updated", updatedCourse: course });
});

app.delete('/courses/:id', (req, res) => {
    const index = courses.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send({ message: "Course not found" });

    const deletedCourse = courses.splice(index, 1)[0];
    res.send({ message: "Course deleted", deletedCourse });
});

app.listen(5000, () => console.log("Server running on port 5000..."));
const router = require('express').Router();
let Task = require('../models/task.model');

// HTTP GET request for "task/"
router.route('/').get((req, res) => {
    // mongoose method that get a List of all the task from MongoDB Atlas database
    Task.find()
        .then(tasks => res.json(tasks)) // get all the tasks and return them in json format
        .catch(err => res.status(400).json('Error: ' + err)); // return an error message
});

// HTTP POST request for "task/add"
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newTask = new Task({
        username,
        description,
        duration,
        date,
    });

    // mongoose method that save the new task to the db
    newTask.save()
        .then(() => res.json('Task added!')) // return a success message
        .catch(err => res.status(400).json('Error: ' + err));
});

// HTTP GET request by id
router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
      .then(task => res.json(task))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// HTTP DELETE request by id
router.route('/:id').delete((req, res) => {
Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// HTTP UPDATE request by id
router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
    .then(task => {
        task.username = req.body.username;
        task.description = req.body.description;
        task.duration = Number(req.body.duration);
        task.date = Date.parse(req.body.date);

        task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
const router = require('express').Router();
let User = require('../models/user.model');

// HTTP GET request for "users/"
router.route('/').get((req, res) => {
    // mongoose method that get a List of all the users from MongoDB Atlas database
    User.find()
        .then(users => res.json(users)) // get all the users and return them in json format
        .catch(err => res.status(400).json('Error: ' + err)); // return an error message
});


// HTTP POST request for "users/add"
router.route('/add').post((req, res) => {
    const username = req.body.username;
    
    const newUser = new User({username});

    // mongoose method that save the new user to the db
    newUser.save()
        .then(() => res.json('User added!')) // return a success message
        .catch(err => res.status(400).json('Error: ' + err));
});

// HTTP DELETE request by id
router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
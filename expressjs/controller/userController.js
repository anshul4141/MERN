// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userService = require('../models/userModel');

// Add a new user in MongoDB
// http://localhost:5000/api/user/addUser
router.post('/adduser', (req, res) => {
    userService.addUser(req.body)
        .then(result => res.status(201).json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Update a user (using POST)
// http://localhost:5000/api/user/updateuser/id
router.post('/updateuser/:id', (req, res) => {
    userService.updateUser(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Delete a user (using POST)
// http://localhost:5000/api/user/deleteuser/id
router.post('/deleteuser/:id', (req, res) => {
    userService.deleteUser(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Get user by ID
// http://localhost:5000/api/user/getuser/id
router.get('/getuser/:id', (req, res) => {
    userService.getUserById(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Search users
// http://localhost:5000/api/user/searchuser
router.get('/searchuser', (req, res) => {
    userService.searchUsers(req.query)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Authenticate user
// http://localhost:5000/api/user/authenticate
router.post('/authenticate', (req, res) => {
    userService.authenticateUser(req.body.loginId, req.body.password)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;
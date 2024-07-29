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
            console.error('error ========== >');
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Search users
// http://localhost:5000/api/user/searchuser
router.get('/searchuser', (req, res) => {
    userService.searchUsers(req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

router.post('/deleteuser/:id', (req, res) => {
    userService.deleteUser(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;
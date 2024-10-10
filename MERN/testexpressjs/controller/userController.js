// userController.js

const express = require('express');
const router = express.Router();
const userService = require('../models/userModel');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Authentication route (public)
router.post('/authenticate', (req, res) => {
    userService.authenticateUser(req.body.loginId, req.body.password)
        .then(user => {
            req.session.user = user; // Set user in session
            console.log(req.session.id, '======sessionid==========');
            res.json({ message: 'Authentication successful', user });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Logout route (public)
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Logout failed' });
        } else {
            res.json({ message: 'Logout successful' });
        }
    });
});

router.post('/signup', (req, res) => {
    userService.addUser(req.body)
        .then(result => res.status(201).json(result))
        .catch(error => {
            console.error('error ========== >');
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Apply middleware to all routes below
router.use(isAuthenticated);

// Add a new user in MongoDB
router.post('/adduser', (req, res) => {
    userService.addUser(req.body)
        .then(result => res.status(201).json(result))
        .catch(error => {
            console.error('error ========== >');
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Search users by firstName
router.get('/searchuser', (req, res) => {
    const query = req.query.query ? { firstName: new RegExp(req.query.query, 'i') } : {};
    userService.searchUsers(query)
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

router.post('/updateuser/:id', (req, res) => {
    userService.updateUser(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

router.get('/getuser/:id', (req, res) => {
    userService.getUserById(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;

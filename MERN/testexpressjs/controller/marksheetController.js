const express = require('express');
const router = express.Router();
const marksheetService = require('../models/marksheetModel');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Apply middleware to all routes below
router.use(isAuthenticated);

// Add a new marksheet in MongoDB
router.post('/addMarksheet', (req, res) => {
    marksheetService.addMarksheet(req.body)
        .then(result => res.status(201).json(result))
        .catch(error => {
            console.error('Error adding marksheet:', error);
            res.status(500).json({ error: error.message });
        });
});

// Update a marksheet
router.post('/updateMarksheet/:id', (req, res) => {
    marksheetService.updateMarksheet(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error updating marksheet:', error);
            res.status(500).json({ error: error.message });
        });
});

// Delete a marksheet
router.post('/deleteMarksheet/:id', (req, res) => {
    marksheetService.deleteMarksheet(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error deleting marksheet:', error);
            res.status(500).json({ error: error.message });
        });
});

// Get a marksheet by ID
router.get('/getMarksheet/:id', (req, res) => {
    marksheetService.getMarksheetById(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error fetching marksheet:', error);
            res.status(500).json({ error: error.message });
        });
});

// Search marksheets
router.get('/searchMarksheets', (req, res) => {
    marksheetService.searchMarksheets({})
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error searching marksheets:', error);
            res.status(500).json({ error: error.message });
        });
});

// Get merit list
router.get('/getMeritList', (req, res) => {
    marksheetService.getMeritList()
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error fetching merit list:', error);
            res.status(500).json({ error: error.message });
        });
});

// Find marksheet by roll number
router.get('/findByRollNo/:rollNo', (req, res) => {
    marksheetService.findByRollNo(req.params.rollNo)
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error fetching marksheet by roll number:', error);
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;

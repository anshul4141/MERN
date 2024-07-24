const express = require('express');
const router = express.Router();
const marksheetService = require('../models/marksheetModel');

// Add a new marksheet
router.post('/add', (req, res) => {
    marksheetService.addMarksheet(req.body)
        .then(result => res.status(201).json(result))
        .catch(error => res.status(500).json({ message: error.message }));
});

// Update a marksheet by ID
router.put('/update/:id', (req, res) => {
    marksheetService.updateMarksheet(req.params.id, req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ message: error.message }));
});

// Delete a marksheet by ID
router.delete('/delete/:id', (req, res) => {
    marksheetService.deleteMarksheet(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ message: error.message }));
});

// Get a marksheet by ID
router.get('/:id', (req, res) => {
    marksheetService.getMarksheetById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ message: error.message }));
});

// Get the merit list
router.get('/meritlist', (req, res) => {
    marksheetService.getMeritList()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ message: error.message }));
});

// Search marksheets
router.post('/search', (req, res) => {
    marksheetService.searchMarksheets(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ message: error.message }));
});

module.exports = router;

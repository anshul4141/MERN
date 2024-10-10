// studentController.js

const express = require('express');
const router = express.Router();
const studentService = require('../models/studentModel');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Apply middleware to all routes
router.use(isAuthenticated);

// Add a new student
router.post('/addstudent', (req, res) => {
    studentService.addStudent(req.body)
        .then(result => res.status(201).json(result))
        .catch(error => {
            console.error('error ========== >');
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Search students by name
router.get('/searchstudent', (req, res) => {
    const query = req.query.query ? { name: new RegExp(req.query.query, 'i') } : {};
    studentService.searchStudents(query)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Delete a student by ID
router.post('/deletestudent/:id', (req, res) => {
    studentService.deleteStudent(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Update a student's information
router.post('/updatestudent/:id', (req, res) => {
    studentService.updateStudent(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

// Get a student by ID
router.get('/getstudent/:id', (req, res) => {
    studentService.getStudentById(req.params.id)
        .then(result => res.json(result))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const db = require('./db');
const userRoute = require('./controller/userController');
const marksheetRoute = require('./controller/marksheetController');
const studentRoute = require('./controller/studentController');

const app = express();

// Custom CORS middleware to handle any origin with credentials
app.use((req, res, next) => {
    const origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', origin); // Dynamically set allowed origin
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Handle preflight request (OPTIONS method)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Send OK status for preflight
    }

    next();
});

app.use(bodyParser.json());

app.use(session({
    secret: 'your_secret_key', // Change this to a strong secret
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use('/api/user', userRoute);
app.use('/api/marksheet', marksheetRoute);
app.use('/api/student', studentRoute);

const port = 5000;

app.listen(port, () => {
    console.log("Server is running on: http://localhost:" + port);
});
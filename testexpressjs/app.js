const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const db = require('./db');

const userRoute = require('./controller/userController');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/user', userRoute)

const port = 5000;

app.listen(port, () => {
    console.log("Server is running on: http://localhost:" + port);
});

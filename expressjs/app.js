const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')

const db = require('./db');

const userRoute = require('./controller/userController');
const marksheetRoute = require('./controller/marksheetController');

const app = express();

app.use(cors())

app.use(bodyParser.json())

app.use('/api/user', userRoute)
app.use('/api/marksheet', marksheetRoute)

const port = 5000

app.listen(port, () => {

    console.log('server is runnin on http:\\localhost:' + port)

})




const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Student', studentSchema);
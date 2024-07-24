const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
    },
    physics: {
        type: Number,
        required: true,
    },
    chemistry: {
        type: Number,
        required: true,
    },
    maths: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Marksheet', userSchema);

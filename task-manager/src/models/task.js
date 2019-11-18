const mongoose = require('mongoose');
const validator = require('validator'); // npm install validator

const Task = mongoose.model("Task", {
    description: {
        type: String,
        required: [true, "Wajib Diisi"],
        trim: true
    },
    completed: {
        type: Boolean,
        required: [true, "Wajib diisi"],
        default: false
    }
});

module.exports = Task;
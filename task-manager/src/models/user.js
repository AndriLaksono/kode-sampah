const mongoose = require('mongoose');
const validator = require('validator'); // npm install validator

const User = mongoose.model("User", {
    name: {
        type: String,
        required: [true, "Ya diisi kali"],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Masukan format email yang betul");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
    },
    age: {
        type: Number,
        default: 1,
        // min: [1, "Minimal Satu woyy"],
        // max: [100, "Lebih dari satu abad gaboleh"],
        validate(value) {
            if (value <= 0) {
                throw new Error("Harus lebih dari 0");
            }
        }
    }
});

module.exports = User;
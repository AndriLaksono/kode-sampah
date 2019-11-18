const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/task-manager-api', { 
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model("User",{
    name: {
        type: String,
        required: [true, "Ya diisi kali"],
        validate(value) {
            if (!value) {
                throw new Error("Wajib diisi");
            }
        }
    },
    age: {
        type: Number,
        // min: [1, "Minimal Satu woyy"],
        // max: [100, "Lebih dari satu abad gaboleh"],
        validate(value) {
            if (value <= 0) {
                throw new Error("Harus lebih dari 0");
            }
        }
    }
});

const me = new User({
    name: "Tomcat",
    age: -1
});

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log(error.message);
})
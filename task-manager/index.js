const express = require('express');
const app = express();
const port = process.env.port || 3001;

// mongoose + model
require('./src/db/mongoose');
const User = require('./src/models/user'); 
const Task = require('./src/models/task');

app.use(express.json());

// insert
app.post('/users', (req, res) => {
    let user = new User(req.body);

    user.save().then(() => {
        res.send(user);
    }).catch((err) => {
        res.send(err);
    })
});

// insert
app.post('/task', (req, res) => {
    let task = new Task(req.body);

    task.save().then(() => {
        res.send(task);
    }).catch((err) => {
        res.status(400).send(err); // status bisa lihat di httpstatus google
    });
});

// read
app.get('/users', (req, res) => {
    User.find({}).then((usr) => {
        res.send(usr);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// read one
app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((usr) => {
        if (!usr) {
            return res.status(404).send();
        }
        res.send(usr);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// read
app.get('/task', (req, res) => {
    Task.find({}).then((task) => {
        res.send(task);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// read one 
app.get('/task/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update one
app.patch('/users/:id', async (req, res) => {
    const update = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidationOperation = update.every((update) => allowedUpdates.includes(update));
    if (!isValidationOperation) {
        return res.status(400).send({error: "Invalid updates"});
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
// data yg dikirimkan saat update / insert 
// {
//     "age": 11,
//     "name": "Master",
//     "email": "master@email.com",
//     "password": "okesiappp"
// }


// update one task
app.patch('/task/:id', async (req, res) => {
    const update = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidationOperation = update.every((update) => allowedUpdates.includes(update));
    if (!isValidationOperation) {
        return res.status(400).send({ error: "Invalid updates" });
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete one
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
// ga ada data json di body form nya

// delete one
app.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log("server jalan di port " + port);
})
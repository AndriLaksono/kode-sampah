const express = require('express');
const router = new express.Router()

// database mongoose + model User
require('../db/mongoose');
const User = require('../models/user'); 

router.get('/okesiap', (req, res) => {
    res.send({
        name: "oke"
    })
});

// insert
router.post('/users', (req, res) => {
    let user = new User(req.body);

    user.save().then(() => {
        res.send(user);
    }).catch((err) => {
        res.send(err);
    })
});

// read
router.get('/users', (req, res) => {
    User.find({}).then((usr) => {
        res.send(usr);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// read one
router.get('/users/:id', (req, res) => {
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

// update one
router.patch('/users/:id', async (req, res) => {
    const update = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidationOperation = update.every((update) => allowedUpdates.includes(update));
    if (!isValidationOperation) {
        return res.status(400).send({ error: "Invalid updates" });
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

// delete one
router.delete('/users/:id', async (req, res) => {
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

module.exports = router
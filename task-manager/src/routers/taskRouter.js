const express = require('express');
const router = new express.Router();

// database mongoose + Task Model
require('../db/mongoose');
const Task = require('../models/task');

// insert
router.post('/task', (req, res) => {
    let task = new Task(req.body);

    task.save().then(() => {
        res.send(task);
    }).catch((err) => {
        res.status(400).send(err); // status bisa lihat di httpstatus google
    });
});

// read
router.get('/task', (req, res) => {
    Task.find({}).then((task) => {
        res.send(task);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// read one 
router.get('/task/:id', async (req, res) => {
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

// update one task
router.patch('/task/:id', async (req, res) => {
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
router.delete('/task/:id', async (req, res) => {
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

module.exports = router;
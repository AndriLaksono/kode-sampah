const express = require('express');
const app = express();
const port = process.env.port || 3001;

// router
const userRouter = require('./src/routers/userRouter');
const taskRouter = require('./src/routers/taskRouter');

// setting
app.use(express.json());
app.use(userRouter, taskRouter);


app.listen(port, () => {
    console.log("server jalan di port " + port);
})
const Router = require('express').Router();
const userRouter = require('./user');
const taskRouter = require('./task')

Router.use(taskRouter);
Router.use(userRouter);





module.exports = Router;


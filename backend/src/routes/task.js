const Router = require('express').Router();
const taskController = require('./../controllers/task');

Router.post('/tasks',taskController.create);
Router.get('/tasks',taskController.list);


module.exports = Router;


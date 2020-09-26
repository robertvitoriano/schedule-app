const Router = require('express').Router();
const taskController = require('./../controllers/task');

Router.post('/tasks',taskController.create);
Router.get('/tasks',taskController.list);
Router.delete('/tasks',taskController.delete);
Router.patch('/tasks',taskController.update);



module.exports = Router;


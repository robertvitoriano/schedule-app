const Router = require('express').Router();
const taskController = require('./../controllers/task');
const auth = require('./../middleware/auth')

Router.post('/tasks/create',auth,taskController.create);
Router.get('/tasks/list',auth,taskController.list);
Router.delete('/tasks/delete',auth,taskController.delete);
Router.patch('/tasks/update',auth,taskController.update);



module.exports = Router;


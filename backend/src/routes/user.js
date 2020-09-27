const Router = require('express').Router();
const userController = require('./../controllers/user');
const auth = require('../middleware/auth');
Router.post('/users',userController.create);
Router.get('/users/:userId',auth,userController.index);
Router.post('/users/login',userController.login);




module.exports = Router;
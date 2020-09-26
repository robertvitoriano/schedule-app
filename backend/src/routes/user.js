const Router = require('express').Router();
const userController = require('./../controllers/user');
Router.post('/users',userController.create);

module.exports = Router;
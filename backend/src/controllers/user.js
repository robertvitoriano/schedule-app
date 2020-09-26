const { create } = require('../models/task');
const User = require('./../models/user');

module.exports = {
    async create(req,res){
       const user = await User.create(req.body);
       


        return res.send(user);
    }
}
const { create } = require('../models/Task');
const User = require('../models/User');

module.exports = {
    async create(req,res){
       const user = await User.create(req.body);
       


        return res.send(user);
    }
}
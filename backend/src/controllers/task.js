const Task = require('./../models/task');

module.exports = {
    async list(req,res){
        const tasks = await Task.find();
        console.log(tasks);
        return res.send(tasks);

    },
    async create(req,res){
        const task = await Task.create(req.body);
        console.log(task);
        task.save();
        return res.send(task);
    }
}
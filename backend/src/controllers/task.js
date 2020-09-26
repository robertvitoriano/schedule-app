const Task = require('../models/Task');

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
    },
    async delete(req,res){
        const {id} = req.body;
        if(id){
            try{
                await Task.findByIdAndDelete(id)
                return res.send({msg:'Successfully deleted'})
    
            }catch(e){
                console.log(e)
                return res.send(e);
            }

        }else{
            return res.status(400).send({msg:"No Id received"})
        }
    }
}
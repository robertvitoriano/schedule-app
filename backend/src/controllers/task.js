const Task = require('../models/Task');

module.exports = {
    async list(req,res){
        const tasks = await Task.find();
        return res.send(tasks);

    },
    async create(req,res){
        const task = await Task.create(req.body);
        task.save();
        return res.send(task);
    },
    async delete(req,res){
         console.log(req.body);
        console.log(req.body.id);
        if(req.body.id){
            try{
                await Task.findByIdAndDelete(req.body.id)
                const tasks = await Task.find();
                return res.send(tasks   )
    
            }catch(e){
                console.log(e)
                return res.send(e);
            }

        }else{
            return res.status(400).send({msg:"No Id received"})
        }
    }
}
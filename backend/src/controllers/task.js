const { update } = require('../models/Task');
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
    },
    async update(req,res){
        if(req.body.id){
            //title, start, end, allDay
            try{
                await Task.findByIdAndUpdate( {_id: req.body.id },
                { title: req.body.title,
                  start:req.body.start,
                  end:req.body.end,
                  allDay:req.body.allDay
             });
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



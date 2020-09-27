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
        console.log(req.body.id)

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
        console.log(req.body.id)
        if(req.body.id){
            //title, start, end, allDay,_id
            try{
                await Task.findByIdAndUpdate( {_id: req.body.id },
                { title: req.body.title,
                  dayStart:req.body.dayStart,
                  dayEnd:req.body.dayEnd,
                  hourStart:req.body.hourStart,
                  hourEnd:req.body.hourEnd,
                  allDay:req.body.allDay
                 });
                const task = await Task.findById(req.body.id);
                return res.send(task)
    
            }catch(e){
                console.log(e)
                return res.send(e);
            }

        }else{
            return res.status(400).send({msg:"No Id received"})
        }
    }


    }



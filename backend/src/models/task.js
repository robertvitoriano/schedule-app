const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title:{
        type:String
    },
    start:{
        type:String
    },
    end:{
        type:String
    },
    allDay:{
        type:Boolean,
    }
})


const Task  = mongoose.model('task',TaskSchema);

module.exports = Task;
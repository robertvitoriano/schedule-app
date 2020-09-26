const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title:{
        type:String
    },
    date:{
        type:String
    }
})


const Task  = mongoose.model('task',TaskSchema);

module.exports = Task;
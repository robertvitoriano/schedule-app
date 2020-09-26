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
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
})


const Task  = mongoose.model('task',TaskSchema);

module.exports = Task;
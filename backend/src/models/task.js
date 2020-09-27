const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
  },
  dayStart: {
    type: String,
  },
  dayEnd: {
    type: String,
  },
  hourStart: {
    type: String,
  },
  hourEnd: {
    type: String,
  },
  allDay: {
    type: Boolean,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;

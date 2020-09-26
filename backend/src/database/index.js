const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://robertvitoriano:123@cluster0.btwq6.mongodb.net/schedule-app?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("I'm connected to mongodb")
});
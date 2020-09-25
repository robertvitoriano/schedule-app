const express = require('express');
const app = express();
const Router = require('./routes');

app.use(express.json());
app.use(Router);

app.listen(4000,()=>{
    console.log('My app is running');
})
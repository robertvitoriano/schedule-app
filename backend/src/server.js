const express = require('express');
const cors = require('cors');

const app = express();
const Router = require('./routes');
const PORT = 4000;
require('./database');
app.use(cors())
app.use(express.json());
app.use(Router);

app.listen(4000,()=>{
    console.log("My app is up and running on port "+PORT);
})
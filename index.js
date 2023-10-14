//require express
const express = require('express');
const port = 8000;
const app = express();

//attach config file
const db = require('./config/mongoose');

//encoding and decoding moddleware
const { urlencoded } = require('body-parser');
app.use(express.json());
app.use(express.urlencoded());

//Add router
app.use('/', require('./routes/index'));

//test the server
app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    console.log(`Server running at ${port}`);
});
const mongoose = require('mongoose');
const db = mongoose.connection;


//connect to mongoDb database
async function main(err){
    if(err){
        console.log(err);
    }
    await mongoose.connect('mongodb://127.0.0.1:27017/api');
    console.log("Database is connected :: MongoDB");
}

main().catch(err => console.log(err));

module.exports = db;
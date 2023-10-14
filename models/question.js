const mongoose = require('mongoose');

//create the question model
const questionSchema = new mongoose.Schema({
   
    title:{
    type:String,
    required: true
    }, 

    options:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Option'
    }]
    
});


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
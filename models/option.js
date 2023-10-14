const mongoose = require('mongoose');

//create option model
const optionSchema = new mongoose.Schema({
    option:{
        type:String,
        required:true
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
        required:true
    },
    vote:{
        type:Number,
        default:0
    },
    add_vote:{
        type:String,
    }
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
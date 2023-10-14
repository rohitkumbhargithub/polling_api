const Question = require('../models/question');
const Option = require('../models/option');

//creating module
module.exports.create = async function(req, res){
    //In this function question are created
    try{
        const {title} = req.body;
        const existingQuestion = await Question.findOne({'title' : title});

        //if the question already exist
        if(existingQuestion){
            return res.status(401).json({
                message: 'Question is already exits',
                status: 'failure',
                data: [{ id: existingQuestion._id}]
            });
        };

        //Question create
        const question = await Question.create({'title': title});

        return res.status(200).json({
            message: 'Question is created',
            status: 'successful',
            data: [question]
        })
        
    }catch(err){
        console.log('Error Creating Question: ', err);
        return res.status(500).json({
            message: 'Internal server error',
            status: 'failure',
            data: []
        });
    } 
};

//deleting module
module.exports.delete = async function(req, res){
    
    try{
        //Empty question id 
        const questionId = req.params.id;

        if(!questionId){
            return res.status(404).json({
                message: 'Question id is empty',
                status: 'failure',
                data: []
            });
        };

        const question = await Question.findById(questionId);
        //Invalid question id
        if(!question){
            return res.status(404).json({
                message: 'Invalid Question',
                status: 'failure',
                data: []
            });
        };

        await Option.deleteMany({ '_id': {$in: question.options}});
        await Question.findByIdAndDelete(questionId);

        return res.status(200).json({
            message: "Question is deleted",
            status: "success",
            data: []
        });
        
    }catch(err){
        console.log('Error delete Question ', err);
        return res.status(500).json({
            message: 'Internal server error',
            status: 'failure',
            data: []
        });
    }
};

//get the question 
module.exports.getQuestion = async function(req, res){
    try{
        const questionId = req.params.id;
        //if qustion is empty
        if(!questionId){
            return res.status(404).json({
                message: 'Empty Question id',
                status: 'failure',
                data: []
            });
        };

        const question = await Question.findById(questionId);
        //if invalid question
        if(!question){
            return res.status(404).json({
                message: 'Invaild question id',
                status: 'failure',
                data: []
            });
        };

        //populate option collection
        await question.populate({path: 'options', select: '-question'});

        return res.status(200).json({
            message: 'question fatched',
            status: 'success',
            data: [question]
        });

    }catch(err){
        console.log("Error Get Question: ", err);
        return res.status(500).json({
            message: 'Interval server error',
            status: 'failure',
            data: []
        });
    }
}
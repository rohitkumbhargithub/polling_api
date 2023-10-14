const Option = require('../models/option');
const Question = require('../models/question');

//create option
module.exports.create = async function(req, res){
    try{
        const questionId = req.params.id;
        const {option} = req.body;
        const {vote} = req.body;

        //if question and option is empty 
        if(!questionId || !option){
            return res.status(404).json({
                message: 'Empty Question id/option',
                status: 'failure',
                data: []
            });
        };

        const question = await Question.findById(questionId);
        //if question id invaild
        if(!question){
            return res.status(404).json({
                message: 'invalid Question Id',
                status: 'failure',
                data: []
            });
        }

        const baseUrl = `http://localhost:8000`

        const options = await Option.create({'option': option, 'question': question._id});
        options.vote = vote;
        options.add_vote = `${baseUrl}/api/options/${options.id}/add_vote`;
        await options.save();

        if(!options){
            throw new Error('unable to create option');
        }

        question.options.push(options._id);
        await question.save();

        return res.status(200).json({
            message: 'Option created',
            status: 'success',
            data: [options]
        });

    }
    catch(err){
        console.log('Create Option Error: ', err);

        return res.status(500).json({
            message: 'Internal Server Error',
            status: 'failure',
            data: []
        });
    }
};

//delete option
module.exports.delete = async function(req, res){

    try{
        const optionId = req.params.id;
        //if option id is empty
        if(!optionId){
            res.status(404).json({
                message: 'Empty option id',
                status: 'failure',
                data: []
            });
        };

        const option = await Option.findById(optionId);
        //if option id invaild
        if(!option){
            return res.status(404).json({
                message: 'Invaild option id recieved',
                status: 'failure',
                data: []
            });
        };

        await Question.findByIdAndUpdate(option.question, {$pull: {'option': option.id}});
        await Option.findByIdAndDelete(optionId);
        //option deleted
        res.status(200).json({
            message: 'Option deleted',
            status: 'success',
            data: []
        });

    }catch(err){
        console.log('Delete Option Error: ', err);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 'failure',
            data: []
        });
    }
};

//add to vote module

module.exports.addVote = async function(req, res){

    try{
        const optionId = req.params.id;
        //if option id is empty
        if(!optionId){
            return res.status(404).json({
                message: 'Option id is empty',
                status: 'failure',
                data: []
            });
        };

        const option = await Option.findById(optionId);
        //option is invaild 
        if(!option){
            return res.status(404).json({
                message: 'Option id is invaild',
                status: 'failure',
                data: []
            });
        };

        //Add vote
        option.vote++;
        await option.save();

        return res.status(200).json({
            message: 'Vote added',
            status: 'success',
            data: [option]
        });

    }catch(err){
        console.log('Add Vote To Option Error: ', error);

        return res.status(500).json({
            message: 'Interval server error',
            status: 'failure',
            data: []
        });
    }
};
const express = require('express');
const router = express.Router();
const question_controller = require('../../controllers/question_controller');

//this are methods 
//create the question
router.post('/create', question_controller.create);
//delete the question
router.delete('/:id/delete', question_controller.delete);
//get the all question
router.get('/:id', question_controller.getQuestion);

module.exports = router;
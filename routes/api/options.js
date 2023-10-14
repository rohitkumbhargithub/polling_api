const express = require('express');
const router = express.Router();

const option_controller = require('../../controllers/option_controller');

//this are the method
//create the option 
router.post('/:id/options/create', option_controller.create);
//delete the option
router.delete('/:id/delete', option_controller.delete);
//add vote to the particular question
router.get('/:id/add_vote', option_controller.addVote);

module.exports = router;

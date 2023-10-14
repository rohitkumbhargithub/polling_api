const express = require('express');
const router = express.Router();

const option_controller = require('../../controllers/option_controller');

router.delete('/:id/delete', option_controller.delete);
router.get('/:id/add_vote', option_controller.addVote);
router.post('/:id/options/create', option_controller.create);
module.exports = router;

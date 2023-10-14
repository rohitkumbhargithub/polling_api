const express = require('express');
const router = express.Router();

//this is the entry point of all the api/question named url's
router.use('/question', require('./questions'));
//this is entry point of options
router.use('/options', require('./options'));
module.exports = router;
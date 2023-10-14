const express = require('express');
const router = express.Router();

//add the api index route
console.log('Router Runing');
router.use('/api', require('./api/index'));

module.exports = router;
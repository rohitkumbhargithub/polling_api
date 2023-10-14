const express = require('express');
const router = express.Router();

console.log('Router Runing');
router.use('/api', require('./api/index'));

module.exports = router;
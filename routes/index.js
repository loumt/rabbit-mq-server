var express = require('express');
var router = express.Router();

router.use('/', require('./page'));

router.use('/message', require('./message'));

module.exports = router;

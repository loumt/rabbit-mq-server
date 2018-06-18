var express = require('express');
var router = express.Router();

//controllers
var PageController = require('./../controllers/PageController');


router.get('/',PageController.toHome);
router.get('/message',PageController.toMessagePage);

module.exports = router;

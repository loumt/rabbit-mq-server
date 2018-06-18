var express = require('express');
var router = express.Router();

//controllers
var RabbitMQController = require('./../controllers/RabbitMQController');

router.post('/send',RabbitMQController.sendMessage);

module.exports = router;

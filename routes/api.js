var express = require('express');
var router = express.Router();
const publishHandler = require('./../handlers/MQPublisherHandler')

router.post('/message/send', function(req, res, next) {
    console.log('message:' + req.body.message);

    publishHandler.send(new Buffer(req.body.message));

    res.status(200).json({success:true});
});


router.post('/message/test', function(req, res, next) {
    console.log(req.body.message);
    publishHandler.send(new Buffer(req.body.message));
    res.status(200).json({success:true});
});


module.exports = router;

const express = require('express');
const router = express.Router();
const ViewController = require('./../controllers/ViewController')

router.get('/home', ViewController.Home)
router.get('/message', ViewController.Message)

module.exports = router;

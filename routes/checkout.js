var express = require('express');
var router = express.Router();
var checkoutController = require('../controllers/checkout')

/* GET home page. */
router.get('/', checkoutController.getCheckout)
router.post('/', checkoutController.addOrder)

module.exports = router;
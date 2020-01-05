var express = require('express');
var router = express.Router();

var order = require('../controllers/checkout')

/* GET home page. */
router.get('/', order.getCheckout)

router.post('/',order.addOrder)

router.post('/order-details', order.viewOrderDetail)

router.get('/order-list', order.viewOrderList)

module.exports = router;
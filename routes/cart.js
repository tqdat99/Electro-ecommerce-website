var express = require('express');
var router = express.Router();

var cart = require('../controllers/cart')

/* GET home page. */
router.get('/', cart.getCart)
router.get('/count', cart.getCartCount)
router.get('/subview', cart.getCartSubview)

router.post('/', cart.updateCart)
router.post('/additem', cart.addItem)
router.post('/import', cart.import)

module.exports = router;